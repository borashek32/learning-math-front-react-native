import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Vibration } from 'react-native';
import { Loader } from '@components/loaders/CircularLoader';
import { Modal } from '@components/modal/Modal';
import { Score } from '@components/score/Score';
import { useUpdateScoreMutation } from '@api/profile/profile.api';
import { useFormSchema } from '@utils/math/validationShemaMathOperations';
import { ScoreType } from '@api/profile/profile.api.types';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { setTotalUserScore } from '@redux/slices/profile.slice';
import { MathOperationsConstants } from '@constants/MathConstants';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { AppText } from '@components/text/AppText';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { getRandomMathOperation } from '@utils/math/getRandomMathOperation';
import { getCheckMathOperation } from '@utils/math/getCheckMathOperation';
import { Error } from '@components/error/Error';
import { Digit } from '@components/digit/Digit';
import { AppLayout } from '@components/layouts/AppLayout';
import { AnswerType } from 'types/mathOperations.types';
import { ResultInput } from '@components/inputs/ResultInput';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { BlueButton } from 'components/buttons/BlueButton';

export const EquationsWithX = () => {
  const [firstNumber, setFirstNumber] = useState<number>(
    generateRandomNumber(1, 10),
  );
  const [secondNumber, setSecondNumber] = useState<number>(
    generateRandomNumber(10, 100),
  );
  const [hint, setHint] = useState(false);
  const [hintIsUsed, setHintIsUsed] = useState(false);
  const [score, setScore] = useState(0);
  const [serverError, setServerError] = useState('');
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<AnswerType>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [updateScore, { isLoading }] = useUpdateScoreMutation();
  const { t } = useTranslation('translation');
  const formSchema = useFormSchema();

  const randomOperation = getRandomMathOperation();
  const checkRandomOperation = getCheckMathOperation(randomOperation);

  const generateNewNumbers = () => {
    setFirstNumber(generateRandomNumber(1, 10));
    setSecondNumber(generateRandomNumber(10, 100));
  };

  const onGenerateNewNumbers = () => {
    setAnswer('');
    setOpen(false);
    generateNewNumbers();
  };

  const onChangeHandler = (answer: string) => {
    setAnswer(answer);
  };

  const { handleSubmit, reset } = useForm<ScoreType>({
    defaultValues: {
      score,
      userId: useAppSelector(selectUserId),
      date: new Date(),
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ScoreType>,
  });

  useEffect(() => {
    if (hint) {
      setHintIsUsed(true);
    }
  }, [hint]);

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setHint(false);
    setHintIsUsed(false);
    setServerError('');

    if (
      (MathOperationsConstants.SUM &&
        secondNumber - firstNumber === Number(answer)) ||
      (MathOperationsConstants.DIFF &&
        secondNumber + firstNumber === Number(answer))
    ) {
      setScore(hintIsUsed ? score + 1 : score + 2);
      setRightWrong('right');
      data = { ...data, score: 2 };
    } else {
      Vibration.vibrate(VIBRATION_PATTERN);
      setScore(score - 1);
      setRightWrong('wrong');
      data = { ...data, score: -1 };
    }

    updateScore(data)
      .unwrap()
      .then(response => {
        reset();
        setOpen(true);
        dispatch(setTotalUserScore(response.data.score));
      })
      .catch((e: any) => {
        if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'));
      });
  };

  const onPressPlayMore = () => {
    setOpen(false);
    generateNewNumbers();
    setAnswer('');
  };

  const onPressTryAgain = () => {
    setOpen(false);
    setAnswer('');
  };

  return (
    <>
      {isLoading && <Loader />}
      {open && (
        <Modal
          text={
            rightWrong === 'right'
              ? t('modal.checkMathOperationSuccess')
              : t('modal.checkMathOperationFail')
          }
          open={open}
          outlinedButton={false}
          buttonName={t('modal.button')}
          buttonCallback={
            rightWrong === 'right' ? onPressPlayMore : onPressTryAgain
          }
          color={rightWrong === 'right' ? 'blue' : 'red'}
          buttonBack={false}
        />
      )}
      <AppLayout title={t('mathOperations.equationsWithX')}>
        <>{serverError && <Error error={serverError} />}</>
        <MathExampleLayout>
          <Digit title={MathOperationsConstants.X} />
          <Digit title={randomOperation} />
          <Digit title={firstNumber} />
          <Digit title={MathOperationsConstants.EQUAL} />
          <Digit title={secondNumber} />
        </MathExampleLayout>

        {!hint ? (
          <AppText
            onPress={() => setHint(true)}
            desc={t('mathOperations.common.getHint')}
            link
          />
        ) : (
          <MathExampleLayout onPress={() => setHint(false)}>
            <Digit title={MathOperationsConstants.X} italic />
            <Digit title={MathOperationsConstants.EQUAL} italic />
            <Digit title={secondNumber} italic />
            <Digit title={checkRandomOperation} italic />
            <Digit title={firstNumber} italic />
          </MathExampleLayout>
        )}

        <MathExampleLayout>
          <Digit title={MathOperationsConstants.X} />
          <Digit title={MathOperationsConstants.EQUAL} />
          <ResultInput value={answer} onChange={onChangeHandler} />
        </MathExampleLayout>

        <ButtonsLayout>
          <BlueButton
            onPress={onGenerateNewNumbers}
            title={t('mathOperations.common.generate')}
          />
          <BlueButton
            onPress={handleSubmit(onSubmit)}
            title={t('mathOperations.common.check')}
            disabled={!answer}
          />
        </ButtonsLayout>

        <Score score={score} />
      </AppLayout>
    </>
  );
};

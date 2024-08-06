import React, { useEffect, useState } from 'react';
import { Keyboard, Vibration } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { Score } from '@components/score/Score';
import { ResultInput } from '@components/inputs/ResultInput';
import { Digit } from '@components/digit/Digit';
import { MathOperation } from '@components/mathOperation/MathOperation';
import { AppLayout } from '@components/layouts/AppLayout';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { MathOperationButton } from '@components/buttons/MathOperationButton';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { Error } from '@components/error/Error';
import { Modal } from '@components/modal/Modal';
import { Loader } from '@components/loaders/CircularLoader';
import { useFormSchema } from '@utils/math/validationShemaMathOperations';
import { useUpdateScoreMutation } from '@api/profile/profile.api';
import { AnswerType } from 'types/mathOperations.types';
import { ScoreType } from '@api/profile/profile.api.types';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { setTotalUserScore } from '@redux/slices/profile.slice';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { MathOperationsConstants } from '@constants/MathConstants';

type Props = {
  digit: string;
};

export const MultiplicationNumber = () => {
  const route = useRoute();
  const { digit } = route.params as Props;

  const [firstDigit, setFirstDigit] = useState<number>(
    generateRandomNumber(1, 10),
  );
  const [score, setScore] = useState(0);
  const [serverError, setServerError] = useState('');
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<AnswerType>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [updateScore, { isLoading }] = useUpdateScoreMutation();
  const { t } = useTranslation('translation');
  const formSchema = useFormSchema();

  const generateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2);
  };

  const onGenerateNewDigits = () => {
    setAnswer('');
    setOpen(false);
    generateNewDigits();
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

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('');
    const answerToNumber = Number(answer);
    Keyboard.dismiss();
    if (+digit * firstDigit === answerToNumber) {
      setScore(score + 1);
      setRightWrong('right');
      data = { ...data, score: 1 };
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
    setAnswer('');
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2);
  };

  const onPressTryAgain = () => {
    setOpen(false);
    setAnswer('');
  };

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2);
  }, []);

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
        />
      )}
      <AppLayout title={t('mathOperations.multBy') + ' ' + digit}>
        <>{serverError && <Error error={serverError} />}</>
        <MathExampleLayout>
          <Digit title={firstDigit} />
          <MathOperation title={MathOperationsConstants.MULTIPLY} />
          <Digit title={digit} />
          <MathOperation title={MathOperationsConstants.EQUAL} />

          <ResultInput
            value={answer}
            type="numeric"
            onChange={onChangeHandler}
          />
        </MathExampleLayout>

        <ButtonsLayout>
          <MathOperationButton
            buttonCallback={onGenerateNewDigits}
            title={t('mathOperations.common.generate')}
          />
          <MathOperationButton
            buttonCallback={handleSubmit(onSubmit)}
            title={t('mathOperations.common.check')}
            disabled={!answer}
          />
        </ButtonsLayout>

        <Score score={score} />
      </AppLayout>
    </>
  );
};

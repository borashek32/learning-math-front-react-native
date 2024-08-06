import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Keyboard, Vibration, View } from 'react-native';
import { MathOperation } from '@components/mathOperation/MathOperation';
import { Digit } from '@components/digit/Digit';
import { ResultInput } from '@components/inputs/ResultInput';
import { Score } from '@components/score/Score';
import { AppLayout } from '@components/layouts/AppLayout';
import { useUpdateScoreMutation } from '@api/profile/profile.api';
import { ScoreType } from '@api/profile/profile.api.types';
import { Loader } from '@components/loaders/CircularLoader';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { Modal } from '@components/modal/Modal';
import { AnswerType } from 'types/mathOperations.types';
import { Error } from '@components/error/Error';
import { useFormSchema } from '@utils/math/validationShemaMathOperations';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { setTotalUserScore } from '@redux/slices/profile.slice';
import { MathOperationsConstants } from '@constants/MathConstants';
import { checkMathOperation } from '@utils/math/checkMathOperation';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { BlueButton } from 'components/buttons/BlueButton';

export const Sum = () => {
  const [firstNumber, setFirstNumber] = useState<number>(
    generateRandomNumber(10, 20),
  );
  const [secondNumber, setSecondNumber] = useState<number>(
    generateRandomNumber(1, 10),
  );
  const [thirdNumber, setThirdNumber] = useState<number>(0);
  const [fourthNumber, setFourthNumber] = useState<number>(0);
  const [score, setScore] = useState(0);

  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<AnswerType>(null);
  const [serverError, setServerError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const [updateScore, { isLoading }] = useUpdateScoreMutation();
  const formSchema = useFormSchema();

  const { t } = useTranslation('translation');

  const generateNewNumbers = (score: number) => {
    if (score <= 5) {
      setFirstNumber(generateRandomNumber(10, 100));
      setSecondNumber(generateRandomNumber(1, 10));
      setThirdNumber(0);
      setFourthNumber(0);
    }
    if (score > 5) {
      setFirstNumber(generateRandomNumber(30, 60));
      setSecondNumber(generateRandomNumber(1, 10));
      setThirdNumber(generateRandomNumber(1, 10));
      setFourthNumber(0);
    }
    if (score > 10) {
      setFirstNumber(generateRandomNumber(30, 80));
      setSecondNumber(generateRandomNumber(1, 10));
      setThirdNumber(generateRandomNumber(1, 10));
      setFourthNumber(generateRandomNumber(1, 10));
    }
  };

  const onGenerateNewNumbers = () => {
    setAnswer('');
    setOpen(false);
    generateNewNumbers(score);
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
    Keyboard.dismiss();

    if (
      checkMathOperation({
        answer: Number(answer),
        operation: MathOperationsConstants.SUM,
        firstOperand: firstNumber,
        secondOperand: secondNumber,
        thirdOperand: thirdNumber ? thirdNumber : 0,
        fourthOperand: fourthNumber ? fourthNumber : 0,
      }) === true
    ) {
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
    generateNewNumbers(score);
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
        />
      )}
      <AppLayout title={t('mathOperations.sum')}>
        <View>{serverError && <Error error={serverError} />}</View>
        <MathExampleLayout>
          <Digit title={firstNumber} />
          <MathOperation title={MathOperationsConstants.SUM} />
          <Digit title={secondNumber} />
          {thirdNumber ? (
            <>
              <MathOperation title={MathOperationsConstants.SUM} />
              <Digit title={thirdNumber} />
            </>
          ) : (
            <></>
          )}
          {fourthNumber ? (
            <>
              <MathOperation title={MathOperationsConstants.SUM} />
              <Digit title={fourthNumber} />
            </>
          ) : (
            <></>
          )}
          <MathOperation title={MathOperationsConstants.EQUAL} />

          <ResultInput
            value={answer}
            type="numeric"
            onChange={onChangeHandler}
          />
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

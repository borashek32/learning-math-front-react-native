import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Vibration, View } from 'react-native';
import { MathOperation } from '@components/mathOperation/MathOperation';
import { Digit } from '@components/digit/Digit';
import { ResultInput } from '@components/inputs/ResultInput';
import { Score } from '@components/score/Score';
import { AppLayout } from '@components/layouts/AppLayout';
import { Loader } from '@components/loaders/CircularLoader';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { Modal } from '@components/modal/Modal';
import { Error } from '@components/error/Error';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { MathOperationsConstants } from '@constants/MathConstants';
import { checkMathOperation } from '@utils/math/checkMathOperation';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { BlueButton } from 'components/buttons/BlueButton';
import { useAppForm } from 'hooks/useAppForm';
import { debounce } from 'utils/common/debounce';

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
  const userId = useAppSelector(selectUserId);
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation('translation');
  const { isLoading, serverError, onSubmit } = useAppForm(score);

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

  const debouncedKeyboardDismiss = useMemo(
    () => debounce(Keyboard.dismiss, 500),
    [],
  );

  const onChangeHandler = (answer: string) => {
    setAnswer(answer);
    debouncedKeyboardDismiss();
  };

  const check = () => {
    Keyboard.dismiss();

    const isCorrect = checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.SUM,
      firstOperand: firstNumber,
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ?? 0,
      fourthOperand: fourthNumber ?? 0,
    });

    if (isCorrect) {
      setScore(score + 1);
      setRightWrong(1);
    } else {
      Vibration.vibrate(VIBRATION_PATTERN);
      setScore(score - 1);
      setRightWrong(-1);
    }
    setOpen(true);
  };

  const onPressPlayMore = () => {
    setOpen(false);
    onGenerateNewNumbers();
    setAnswer('');
  };

  const onPressTryAgain = () => {
    setOpen(false);
    setAnswer('');
  };

  useEffect(() => {
    if (userId && rightWrong !== 0) {
      onSubmit({
        score: rightWrong,
        userId,
        date: new Date(),
      });
    }
  }, [score, rightWrong, userId]);

  return (
    <>
      {isLoading && <Loader />}
      {open && (
        <Modal
          text={
            rightWrong === 1
              ? t('modal.checkMathOperationSuccess')
              : t('modal.checkMathOperationFail')
          }
          open={open}
          outlinedButton={false}
          buttonName={t('modal.button')}
          buttonCallback={rightWrong === 1 ? onPressPlayMore : onPressTryAgain}
          color={rightWrong === 1 ? 'blue' : 'red'}
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
            onPress={check}
            title={t('mathOperations.common.check')}
            disabled={!answer}
          />
        </ButtonsLayout>

        <Score score={score} />
      </AppLayout>
    </>
  );
};

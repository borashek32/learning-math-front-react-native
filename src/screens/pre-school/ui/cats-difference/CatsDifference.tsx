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
import { BlueButton } from '@components/buttons/BlueButton';
import { useAppForm } from '@hooks/useAppForm';
import { styles } from '@styles/styles';
import { SvgUri } from 'react-native-svg';
import { debounce } from 'utils/common/debounce';

export const CatsDifference = () => {
  const [firstNumber, setFirstNumber] = useState<number>(
    generateRandomNumber(3, 10),
  );
  const [secondNumber, setSecondNumber] = useState<number>(
    generateRandomNumber(1, 3),
  );
  const [score, setScore] = useState(0);
  const userId = useAppSelector(selectUserId);
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation('translation');
  const { isLoading, serverError, onSubmit } = useAppForm(score);

  const firstNumbers: number[] = [];
  for (let i = 1; i <= firstNumber; i++) {
    firstNumbers.push(i);
  }
  const secondNumbers: number[] = [];
  for (let i = 1; i <= secondNumber; i++) {
    secondNumbers.push(i);
  }

  const generateNewNumbers = (score: number) => {
    if (score <= 5) {
      setFirstNumber(generateRandomNumber(3, 10));
      setSecondNumber(generateRandomNumber(1, 3));
    }
    if (score > 5) {
      setFirstNumber(generateRandomNumber(5, 10));
      setSecondNumber(generateRandomNumber(1, 5));
    }
    if (score > 10) {
      setFirstNumber(generateRandomNumber(7, 10));
      setSecondNumber(generateRandomNumber(1, 7));
    }
  };

  const onGenerateNewNumbers = () => {
    setAnswer('');
    setOpen(false);
    generateNewNumbers(score);
  };

  const debouncedKeyboardDismiss = useMemo(
    () => debounce(Keyboard.dismiss, 1000),
    [],
  );

  const onChangeHandler = (answer: string) => {
    setAnswer(answer);
    debouncedKeyboardDismiss();
  };

  const check = () => {
    Keyboard.dismiss();

    const isCorrect = checkMathOperation({
      answer: firstNumber,
      operation: MathOperationsConstants.SUM,
      firstOperand: secondNumber,
      secondOperand: +answer,
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
          <View style={styles.imagesContainerSumCats}>
            {firstNumbers.map((item: number) => {
              return (
                <SvgUri
                  key={item}
                  uri="https://www.svgrepo.com/show/434029/cat.svg"
                  width="34px"
                  height="34px"
                />
              );
            })}
          </View>
          <MathOperation title={MathOperationsConstants.DIFF} />
          <View style={styles.imagesContainerSumCats}>
            {secondNumbers.map((item: number) => {
              return (
                <SvgUri
                  key={item}
                  uri="https://www.svgrepo.com/show/434029/cat.svg"
                  width="34px"
                  height="34px"
                />
              );
            })}
          </View>
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

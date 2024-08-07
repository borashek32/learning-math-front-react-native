import React, { useEffect, useState } from 'react';
import { Keyboard, Vibration, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Score } from '@components/score/Score';
import { ResultInput } from '@components/inputs/ResultInput';
import { Digit } from '@components/digit/Digit';
import { MathOperation } from '@components/mathOperation/MathOperation';
import { AppLayout } from '@components/layouts/AppLayout';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { Loader } from '@components/loaders/CircularLoader';
import { Modal } from '@components/modal/Modal';
import { Error } from '@components/error/Error';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { MathOperationsConstants } from '@constants/MathConstants';
import { BlueButton } from 'components/buttons/BlueButton';
import { useAppForm } from 'hooks/useAppForm';
import { checkMathOperation } from 'utils/math/checkMathOperation';

export const MultiplicationCheck = () => {
  const [firstMultiplier, setFirstMultiplier] = useState<number>(0);
  const [secondMultiplier, setSecondMultiplier] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const userId = useAppSelector(selectUserId);

  const { t } = useTranslation('translation');

  const { isLoading, serverError, onSubmit } = useAppForm(score);

  const generateNewDigits = () => {
    setFirstMultiplier(Math.floor(Math.random() * 8) + 2);
    setSecondMultiplier(Math.floor(Math.random() * 8) + 2);
  };

  const onGenerateNewDigits = () => {
    generateNewDigits();
    setAnswer('');
    setOpen(false);
  };

  const onChangeHandler = (answer: string) => {
    setAnswer(answer);
  };

  const check = () => {
    Keyboard.dismiss();

    if (
      checkMathOperation({
        answer: firstMultiplier * secondMultiplier,
        operation: MathOperationsConstants.MULTIPLY,
        firstOperand: firstMultiplier,
        secondOperand: Number(answer),
      }) === true
    ) {
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
    setAnswer('');
    generateNewDigits();
  };

  const onPressTryAgain = () => {
    setOpen(false);
    setAnswer('');
  };

  useEffect(() => {
    generateNewDigits();
  }, []);

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
      <AppLayout title={t('mathOperations.multCheck')}>
        <View>{serverError && <Error error={serverError} />}</View>
        <MathExampleLayout>
          <Digit title={firstMultiplier * secondMultiplier} />
          <MathOperation title={MathOperationsConstants.DIVIDE} />
          <Digit title={firstMultiplier} />
          <MathOperation title={MathOperationsConstants.EQUAL} />

          <ResultInput
            value={answer}
            type="numeric"
            onChange={onChangeHandler}
          />
        </MathExampleLayout>

        <ButtonsLayout>
          <BlueButton
            onPress={onGenerateNewDigits}
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

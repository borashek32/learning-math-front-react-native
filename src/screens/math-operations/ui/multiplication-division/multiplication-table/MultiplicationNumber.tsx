import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, Vibration } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { Score } from '@components/score/Score';
import { ResultInput } from '@components/inputs/ResultInput';
import { Digit } from '@components/digit/Digit';
import { MathOperation } from '@components/mathOperation/MathOperation';
import { AppLayout } from '@components/layouts/AppLayout';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { Error } from '@components/error/Error';
import { Modal } from '@components/modal/Modal';
import { Loader } from '@components/loaders/CircularLoader';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { MathOperationsConstants } from '@constants/MathConstants';
import { BlueButton } from 'components/buttons/BlueButton';
import { useAppForm } from 'hooks/useAppForm';
import { checkMathOperation } from 'utils/math/checkMathOperation';
import { debounce } from 'utils/common/debounce';

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
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const userId = useAppSelector(selectUserId);

  const { t } = useTranslation('translation');

  const { isLoading, serverError, onSubmit } = useAppForm(score);

  const generateNewNumbers = () => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2);
  };

  const onGenerateNewNumbers = () => {
    setAnswer('');
    setOpen(false);
    generateNewNumbers();
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

    if (
      checkMathOperation({
        answer: Number(answer),
        operation: MathOperationsConstants.MULTIPLY,
        firstOperand: +digit,
        secondOperand: firstDigit,
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
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2);
  };

  const onPressTryAgain = () => {
    setOpen(false);
    setAnswer('');
  };

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2);
  }, []);

  useEffect(() => {
    if (userId && rightWrong !== 0) {
      onSubmit({
        score: rightWrong,
        userId,
        date: new Date(),
      });
    }
  }, [score, userId, rightWrong]);

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

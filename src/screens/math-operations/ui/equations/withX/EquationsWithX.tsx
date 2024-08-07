import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Vibration } from 'react-native';
import { Loader } from '@components/loaders/CircularLoader';
import { Modal } from '@components/modal/Modal';
import { Score } from '@components/score/Score';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { MathOperationsConstants } from '@constants/MathConstants';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { AppText } from '@components/text/AppText';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { Error } from '@components/error/Error';
import { Digit } from '@components/digit/Digit';
import { AppLayout } from '@components/layouts/AppLayout';
import { ResultInput } from '@components/inputs/ResultInput';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { BlueButton } from 'components/buttons/BlueButton';
import { useAppForm } from 'hooks/useAppForm';
import { checkMathOperation } from 'utils/math/checkMathOperation';

export const EquationsWithX = () => {
  const [firstNumber, setFirstNumber] = useState<number>(
    generateRandomNumber(1, 10),
  );
  const [secondNumber, setSecondNumber] = useState<number>(
    generateRandomNumber(10, 100),
  );
  const [hint, setHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const userId = useAppSelector(selectUserId);
  const { t } = useTranslation('translation');
  const { isLoading, serverError, onSubmit } = useAppForm(score);

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
    Keyboard.dismiss();
  };

  const check = () => {
    Keyboard.dismiss();

    const isCorrect = checkMathOperation({
      answer: secondNumber,
      operation: MathOperationsConstants.SUM,
      firstOperand: +answer,
      secondOperand: firstNumber,
    });

    if (isCorrect) {
      if (hint) {
        setScore(score);
        setRightWrong(1);
      } else {
        setScore(score + 1);
        setRightWrong(1);
      }
    } else {
      Vibration.vibrate(VIBRATION_PATTERN);
      setScore(score - 1);
      setRightWrong(-1);
    }
    setOpen(true);
  };

  const onPressPlayMore = () => {
    setOpen(false);
    generateNewNumbers();
    setAnswer('');
    setHint(false);
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
          buttonBack={false}
        />
      )}
      <AppLayout title={t('mathOperations.equationsWithX')}>
        <>{serverError && <Error error={serverError} />}</>
        <MathExampleLayout>
          <Digit title={MathOperationsConstants.X} />
          <Digit title={MathOperationsConstants.SUM} />
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
            <Digit title={MathOperationsConstants.DIFF} italic />
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

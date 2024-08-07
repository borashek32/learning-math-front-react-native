import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Vibration, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { Loader } from '@components/loaders/CircularLoader';
import { Modal } from '@components/modal/Modal';
import { Error } from '@components/error/Error';
import { AppLayout } from '@components/layouts/AppLayout';
import { AppText } from '@components/text/AppText';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { MathOperation } from '@components/mathOperation/MathOperation';
import { ResultInput } from '@components/inputs/ResultInput';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { Score } from '@components/score/Score';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { MathOperationsConstants } from '@constants/MathConstants';
import { BlueButton } from 'components/buttons/BlueButton';
import { useAppForm } from 'hooks/useAppForm';
import { styles } from '@styles/styles';
import { debounce } from 'utils/common/debounce';

export const Numbers = () => {
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(generateRandomNumber(1, 10));
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const userId = useAppSelector(selectUserId);
  const { isLoading, serverError, onSubmit } = useAppForm(score);

  const numbers: number[] = [];
  for (let i = 1; i <= number; i++) {
    numbers.push(i);
  }

  const onGenerateNewNumbers = () => {
    setAnswer('');
    setOpen(false);
    setNumber(generateRandomNumber(1, 10));
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
    if (number === Number(answer)) {
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
      <AppLayout title={t('preSchool.numbers.title')}>
        <View>{serverError && <Error error={serverError} />}</View>
        <AppText desc={t('preSchool.numbers.desc')} />

        <MathExampleLayout>
          <View style={styles.imagesContainer}>
            {numbers.map((item: number) => {
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

          <ResultInput value={answer} onChange={onChangeHandler} />
        </MathExampleLayout>

        <ButtonsLayout>
          <BlueButton
            onPress={onGenerateNewNumbers}
            title={t('mathOperations.common.generateCats')}
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

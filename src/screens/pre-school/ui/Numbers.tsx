import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, Vibration, View } from 'react-native';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SvgUri } from 'react-native-svg';
import { generateRandomNumber } from '@utils/math/generateRandomNumber';
import { AnswerType } from 'types/mathOperations.types';
import { useUpdateScoreMutation } from '@api/profile/profile.api';
import { useFormSchema } from '@utils/math/validationShemaMathOperations';
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
import { setTotalUserScore } from '@redux/slices/profile.slice';
import { ScoreType } from '@api/profile/profile.api.types';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { MathOperationsConstants } from '@constants/MathConstants';
import { BlueButton } from 'components/buttons/BlueButton';

export const Numbers = () => {
  const [score, setScore] = useState(0);

  const [number, setNumber] = useState(generateRandomNumber(1, 10));
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<AnswerType>(null);
  const [serverError, setServerError] = useState('');
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const [updateScore, { isLoading }] = useUpdateScoreMutation();
  const formSchema = useFormSchema();

  const { t } = useTranslation();

  const numbers: number[] = [];
  for (let i = 1; i <= number; i++) {
    numbers.push(i);
  }

  const onGenerateNewNumbers = () => {
    setAnswer('');
    setOpen(false);
    setNumber(generateRandomNumber(1, 10));
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

    if (number === Number(answer)) {
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
    onGenerateNewNumbers();
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

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
    width: 160,
  },
});

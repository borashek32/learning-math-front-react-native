import React, { useEffect, useState } from 'react';
import { Keyboard, Vibration, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { Score } from '@components/score/Score';
import { ResultInput } from '@components/inputs/ResultInput';
import { Digit } from '@components/digit/Digit';
import { MathOperation } from '@components/mathOperation/MathOperation';
import { AppLayout } from '@components/layouts/AppLayout';
import { ButtonsLayout } from '@components/layouts/ButtonsLayout';
import { MathOperationButton } from '@components/buttons/MathOperationButton';
import { MathExampleLayout } from '@components/layouts/MathExamlpeLayout';
import { AnswerType } from 'types/mathOperations.types';
import { useUpdateScoreMutation } from '@api/profile/profile.api';
import { useFormSchema } from '@utils/math/validationShemaMathOperations';
import { ScoreType } from '@api/profile/profile.api.types';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectUserId } from '@redux/selectors/auth.selectors';
import { Loader } from '@components/loaders/CircularLoader';
import { Modal } from '@components/modal/Modal';
import { Error } from '@components/error/Error';
import { setTotalUserScore } from '@redux/slices/profile.slice';
import { VIBRATION_PATTERN } from '@constants/vibration';
import { MathOperationsConstants } from '@constants/MathConstants';

export const MultiplicationCheck = () => {
  const [firstMultiplier, setFirstMultiplier] = useState<number>(0);
  const [secondMultiplier, setSecondMultiplier] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<string>('');
  const [serverError, setServerError] = useState('');
  const [rightWrong, setRightWrong] = useState<AnswerType>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [updateScore, { isLoading }] = useUpdateScoreMutation();
  const { t } = useTranslation('translation');
  const formSchema = useFormSchema();

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
    if (answerToNumber === secondMultiplier) {
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
    generateNewDigits();
  };

  const onPressTryAgain = () => {
    setOpen(false);
    setAnswer('');
  };

  useEffect(() => {
    generateNewDigits();
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

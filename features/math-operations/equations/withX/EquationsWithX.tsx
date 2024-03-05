import React, { useEffect, useMemo, useState } from 'react';
import { AnswerType } from '../../mathOperations.types';
import { useDispatch } from 'react-redux';
import { Loader } from '../../../../common/components/loaders/CircularLoader';
import { Modal } from '../../../../common/components/modal/Modal';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '../../../../common/components/layouts/AppLayout';
import { Error } from '../../../../common/components/error/Error';
import { MathExampleLayout } from '../../../../common/components/layouts/MathExamlpeLayout';
import { Digit } from '../../../../common/components/borderedText/borderedText';
import { MathOperation } from '../../../../common/components/mathOperation/MathOperation';
import { ResultInput } from '../../../../common/components/inputs/ResultInput';
import { ButtonsLayout } from '../../../../common/components/layouts/ButtonsLayout';
import { MathOperationButton } from '../../../../common/components/buttons/MathOperationButton';
import { Score } from '../../../../common/components/score/Score';
import { useUpdateScoreMutation } from '../../../profile/profile.api';
import { useFormSchema } from '../../validationShema';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { ScoreType } from '../../../profile/profile.api.types';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { selectUserId } from '../../../auth/auth.selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { setTotalUserScore } from '../../../profile/profile.slice';
import { Keyboard } from 'react-native';
import { MathSignsConstants } from '../../../../common/constants/MathConstants';
import { getRandomMathOperation } from '../../../../common/utils/getRandomMathOperation';
import { getCheckMathOperation } from '../../../../common/utils/getCheckMathOperation';
import { performMathOperation } from '../../../../common/utils/performMathOperation';

export const EquationsWithX = () => {
  console.log('render');
  
  const [firstDigit, setFirstDigit] = useState<number>(null);
  const [secondDigit, setSecondDigit] = useState<number>(null);
  const [score, setScore] = useState(0); 
  const [serverError, setServerError] = useState('');
  const [answer, setAnswer] = useState<string>('');
  const [rightWrong, setRightWrong] = useState<AnswerType>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const randomOperation = useMemo(() => getRandomMathOperation(), []);
  const checkRandomOperation = useMemo(() => getCheckMathOperation(randomOperation), [randomOperation]);
  
  const [updateScore, { isLoading }] = useUpdateScoreMutation();
  const { t } = useTranslation('translation');
  const formSchema = useFormSchema();

  const generateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * 11) + 1);
    setSecondDigit(Math.floor(Math.random() * 31) + (Math.floor(Math.random() * 11) + 1));
  };

  const onGenerateNewDigits = () => {
    setAnswer('');
    setOpen(false);
    generateNewDigits();
  };

  const onChangeHandler = (answer: string) => {
    setAnswer(answer);
  };

  const {
    handleSubmit,
    reset,
  } = useForm<ScoreType>({
    defaultValues: {
      score: score,
      userId: useAppSelector(selectUserId), 
      date: new Date()
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ScoreType>,
  });

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('');
    const answerToNumber = Number(answer);
    Keyboard.dismiss();

    if (performMathOperation(checkRandomOperation, secondDigit, firstDigit) === answerToNumber) {
      setScore(score + 1);
      setRightWrong('right');
      data = { ...data, score: 1 };
    }
    else {
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
    generateNewDigits();
    setAnswer('');
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
          buttonCallback={rightWrong === 'right' ? onPressPlayMore : onPressTryAgain}
          color={rightWrong === 'right' ? 'blue' : 'red'}
        />
      )}
      <AppLayout title={t('screens.equations')}>
        {serverError && <Error error={serverError} />}
        <MathExampleLayout>
          <Digit title={MathSignsConstants.X} />
          <MathOperation title={randomOperation} />
          <Digit title={firstDigit} />
          <MathOperation title={MathSignsConstants.EQUAL} />
          <Digit title={secondDigit} />
        </MathExampleLayout>

        {score < 5 &&
          <MathExampleLayout>
            <Digit title={MathSignsConstants.X} />
            <MathOperation title={MathSignsConstants.EQUAL} />
            <Digit title={secondDigit} />
            <MathOperation title={checkRandomOperation} />
            <Digit title={firstDigit} />
          </MathExampleLayout>
        }

        <MathExampleLayout>
          <Digit title={MathSignsConstants.X} />
          <MathOperation title={MathSignsConstants.EQUAL} />
          <ResultInput 
            value={answer} 
            type={'numeric'}
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
          />
        </ButtonsLayout>
        
        <Score score={score} />
      </AppLayout>
    </>
  );
};

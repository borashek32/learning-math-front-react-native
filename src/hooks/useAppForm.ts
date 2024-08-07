import { useUpdateScoreMutation } from 'api';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { ScoreType } from 'api/profile/profile.api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { setTotalUserScore } from '@redux/slices';
import { useFormSchema } from '@utils/math/validationShemaMathOperations';
import { selectUserId } from '@redux/selectors/auth.selectors';

import { useAppSelector } from './useAppSelector';

export const useAppForm = (score: number) => {
  const dispatch = useDispatch();
  const [updateScore, { isLoading }] = useUpdateScoreMutation();
  const formSchema = useFormSchema();
  const userId = useAppSelector(selectUserId);
  const [serverError, setServerError] = useState('');

  const { t } = useTranslation('translation');

  const { reset } = useForm<ScoreType>({
    defaultValues: {
      score,
      userId,
      date: new Date(),
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ScoreType>,
  });

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('');
    updateScore(data)
      .unwrap()
      .then(response => {
        reset();
        dispatch(setTotalUserScore(response.data.score));
      })
      .catch((e: any) => {
        if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'));
      });
  };
  return { isLoading, serverError, onSubmit };
};

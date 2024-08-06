import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useFormSchema = () => {
  const { i18n } = useTranslation('translation');

  const formSchema = yup.object().shape({
    score: yup.number().required(i18n.t('errors.required')),
    userId: yup.string().required(i18n.t('errors.required')),
    date: yup.date().required(i18n.t('errors.required')),
  });

  return formSchema;
};

import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { Score } from '../../../../../components/score/Score'
import { ResultInput } from '../../../../../components/inputs/ResultInput'
import { Digit } from '../../../../../components/digit/Digit'
import { MathOperation } from '../../../../../components/mathOperation/MathOperation'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../../components/layouts/AppLayout'
import { ButtonsLayout } from '../../../../../components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../../../components/buttons/MathOperationButton'
import { MathExampleLayout } from '../../../../../components/layouts/MathExamlpeLayout'
import { Error } from '../../../../../components/error/Error'
import { Modal } from '../../../../../components/modal/Modal'
import { Loader } from '../../../../../components/loaders/CircularLoader'
import { useFormSchema } from '../../../../../utils/math/validationShemaMathOperations'
import { useUpdateScoreMutation } from '../../../../../api/profile/profile.api'
import { AnswerType } from '../../../../../types/mathOperations.types'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ScoreType } from '../../../../../api/profile/profile.api.types'
import { useAppSelector } from '../../../../../hooks/useAppSelector'
import { selectUserId } from '../../../../../redux/selectors/auth.selectors'
import { yupResolver } from '@hookform/resolvers/yup'
import { setTotalUserScore } from '../../../../../redux/slices/profile.slice'
import { useDispatch } from 'react-redux'
import { generateRandomNumber } from '../../../../../utils/math/generateRandomNumber'

export const MultiplicationNumber = ({ route }) => {
  const { digit } = route.params
  const [firstDigit, setFirstDigit] = useState<number>(generateRandomNumber(1, 10))
  const [score, setScore] = useState(0)
  const [serverError, setServerError] = useState('')
  const [answer, setAnswer] = useState(null)
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const { t } = useTranslation('translation')
  const formSchema = useFormSchema()

  const generateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }

  const onGenerateNewDigits = () => {
    setAnswer('')
    setOpen(false)
    generateNewDigits()
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }

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
  })

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('')
    const answerToNumber = Number(answer)
    Keyboard.dismiss()
    if (digit * firstDigit === answerToNumber) {
      setScore(score + 1)
      setRightWrong('right')
      data = { ...data, score: 1 }
    }
    else {
      setScore(score - 1)
      setRightWrong('wrong')
      data = { ...data, score: -1 }
    }
    
    updateScore(data)
      .unwrap()
      .then(response => {
        reset()
        setOpen(true)
        dispatch(setTotalUserScore(response.data.score))
      })
      .catch((e: any) => {
        if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
      })
  }

  const onPressPlayMore = () => {
    setOpen(false)
    setAnswer('')
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }

  const onPressTryAgain = () => {
    setOpen(false)
    setAnswer('')
  }

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }, [])

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
      <AppLayout title={t('mathOperations.multBy') + ' ' + digit}>
        {serverError && <Error error={serverError} />}
        <MathExampleLayout>
          <Digit title={firstDigit} />
          <MathOperation title='*' />
          <Digit title={digit} />
          <MathOperation title='=' />

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
            disabled={answer ? false : true}
          />
        </ButtonsLayout>
        
        <Score score={score} />
      </AppLayout>
    </>
  )
}
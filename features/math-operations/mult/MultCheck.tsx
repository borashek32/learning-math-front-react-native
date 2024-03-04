import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { Score } from '../../../common/components/score/Score'
import { ResultInput } from '../../../common/components/inputs/ResultInput'
import { Digit } from '../../../common/components/borderedText/borderedText'
import { MathOperation } from '../../../common/components/mathOperation/MathOperation'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { ButtonsLayout } from '../../../common/components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../common/components/buttons/MathOperationButton'
import { MathExampleLayout } from '../../../common/components/layouts/MathExamlpeLayout'
import { AnswerType } from './../mathOperations.types'
import { useUpdateScoreMutation } from '../../profile/profile.api'
import { useFormSchema } from '../validationShema'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ScoreType } from '../../profile/profile.api.types'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUserId } from '../../auth/auth.selectors'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from '../../../common/components/loaders/CircularLoader'
import { Modal } from '../../../common/components/modal/Modal'
import { Error } from '../../../common/components/error/Error'

export const MultCheck = () => {
  const [firstMultiplier, setFirstMultiplier] = useState<number>(null)
  const [secondMultiplier, setSecondMultiplier] = useState<number>(null)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState<string>('')
  const [serverError, setServerError] = useState('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)

  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const { t } = useTranslation('translation')
  const formSchema = useFormSchema()

  const generateNewDigits = () => {
    setFirstMultiplier(Math.floor(Math.random() * 8) + 2)
    setSecondMultiplier(Math.floor(Math.random() * 8) + 2)
  }

  const onGenerateNewDigits = () => {
    generateNewDigits()
    setAnswer('')
    setOpen(false)
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

  const check = () => {
    const answerToNumber = Number(answer)
    Keyboard.dismiss()
    if (firstMultiplier * answerToNumber === firstMultiplier * secondMultiplier) {
      setScore(score + 1)
      setRightWrong('right')
    } else {
      setScore(score - 1)
      setRightWrong('wrong')
    }
    handleSubmit(onSubmit)()
  }

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('')
    data = { ...data, score }
    updateScore(data)
      .unwrap()
      .then(response => {
        reset()
        setOpen(true)
      })
      .catch((e: any) => {
        if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
      })
  }

  const onPressPlayMore = () => {
    setOpen(false)
    setAnswer('')
    generateNewDigits()
  }

  const onPressTryAgain = () => {
    setOpen(false)
    setAnswer('')
  }

  useEffect(() => {
    generateNewDigits()
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
      <AppLayout title={t('mathOperations.multCheck')}>
        {serverError && <Error error={serverError} />}
        <MathExampleLayout>
          <Digit title={firstMultiplier * secondMultiplier} />
          <MathOperation title=':' />
          <Digit title={firstMultiplier} />
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
            buttonCallback={check}
            title={t('mathOperations.common.check')}
          />
        </ButtonsLayout>
        
        <Score score={score} />
      </AppLayout>
    </>
  )
}
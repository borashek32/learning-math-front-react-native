import React, { useEffect, useState } from 'react'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { MathOperation } from '../../../common/components/mathOperation/MathOperation'
import { styles } from './../MathOperations.styles'
import { Digit } from '../../../common/components/borderedText/borderedText'
import { ResultInput } from '../../../common/components/inputs/ResultInput'
import { Score } from '../../../common/components/score/Score'
import { AppLayout } from '../../../common/components/layouts/AppLayout'
import { useTranslation } from 'react-i18next'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateScoreMutation } from '../../profile/profile.api'
import { ScoreType } from '../../profile/profile.api.types'
import { Loader } from '../../../common/components/loaders/CircularLoader'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUserId } from '../../auth/auth.selectors'
import { Modal } from '../../../common/components/modal/Modal'
import { AnswerType } from './../mathOperations.types'
import { Error } from '../../../common/components/error/Error'

export const Summ = () => {
  const [firstDigit, setFirstDigit] = useState<number>(null)
  const [secondDigit, setSecondDigit] = useState<number>(null)
  const [thirdDigit, setThirdDigit] = useState<number>(null)
  const [fourthDigit, setFourthDigit] = useState<number>(null)
  const [score, setScore] = useState(0)

  const [serverError, setServerError] = useState('')
  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)

  const [updateScore, { isLoading }] = useUpdateScoreMutation()

  const { t, i18n } = useTranslation('translation')

  const generateNewDigits = (score: number) => {
    if (score > 5) {
      setThirdDigit(Math.floor(Math.random() * 11) + 1)
    }
    if (score > 10) {
      setFourthDigit(Math.floor(Math.random() * 11) + 1)
    }
    setFirstDigit(Math.floor(Math.random() * 31) + 1)
    setSecondDigit(Math.floor(Math.random() * 11) + 1)
  }
  
  const onGenerateNewDigits = () => {
    setAnswer('')
    setOpen(false)
    generateNewDigits(score)
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }

  const formSchema = yup.object().shape({
    score: yup.number()
      .required(i18n.t('errors.required')),
    userId: yup.string()
      .required(i18n.t('errors.required')),
    date: yup.date()
      .required(i18n.t('errors.required'))
  })

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
    const answerToNumber = Number(answer)
    Keyboard.dismiss()
    if (
      (score <= 5) && 
      (firstDigit + secondDigit === answerToNumber)
      ) {
      setScore(score + 1)
      data = { ...data, score: score}
      setServerError('')
      setRightWrong('right')
      }
      else if (
        (score >5 && score <= 10) && 
        (firstDigit + secondDigit + thirdDigit === answerToNumber)
        ) {
        setScore(score + 1)
        data = { ...data, score: score}
        setServerError('')
        setRightWrong('right')
      }
      else if (
        (score > 10) && 
        (firstDigit + secondDigit + thirdDigit + fourthDigit === answerToNumber)
        ) {
        setScore(score + 1)
        data = { ...data, score: score}
        setServerError('')
        setRightWrong('right')
      }
      else {
        setOpen(true)
        setScore(score - 1)
        setRightWrong('wrong')
      }

    updateScore(data)
    .unwrap()
    .then(response => {
      reset()
      setOpen(true)
    })
    .catch((e: any) => {
      const serverE = t('errors.serverError')
      const error400 = t('errors.error400')
      const error401 = t('errors.error401')

      if (e.status === 'FETCH_ERROR') setServerError(serverE)
      if (e.status === 400) setServerError(error400)
      if (e.status === 401) setServerError(error401)
    })
  }

  const onPressPlayMore = () => {
    setOpen(false)
    generateNewDigits(score)
    setAnswer('')
  }

  const onPressTryAgain = () => {
    setOpen(false)
    setAnswer('')
  }

  useEffect(() => {
    generateNewDigits(score)
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
      <AppLayout title={t('mathOperations.summ')}>
        <>
          <Error error={serverError} />
          <View style={styles.containerMathOperation}>
            <Digit title={firstDigit} />
            <MathOperation title='+' />
            <Digit title={secondDigit} />
            {thirdDigit && 
              <>
                <MathOperation title='+' />
                <Digit title={thirdDigit} />
              </>
            }
            {fourthDigit && 
              <>
                <MathOperation title='+' />
                <Digit title={fourthDigit} />
              </>
            }
            <MathOperation title='=' />

            <ResultInput 
              value={answer} 
              type={'numeric'}
              onChange={onChangeHandler}
            />
          </View>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity style={styles.button} onPress={onGenerateNewDigits}>
              <Text style={styles.buttonText}>{t('mathOperations.common.generate')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>{t('mathOperations.common.check')}</Text>
            </TouchableOpacity>
          </View>
          
          <Score score={score} />
        </>
      </AppLayout>
    </>
  )
}
import React, { useEffect, useState } from 'react'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { MathOperation } from '../../../common/components/mathOperation/MathOperation'
import { styles } from './../MathOperations.styles'
import { Digit } from '../../../common/components/borderedText/borderedText'
import { AlertResult } from '../../../common/components/alerts/AlertResult'
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

export const Summ = ({ navigation }) => {
  const [firstDigit, setFirstDigit] = useState<number>(null)
  const [secondDigit, setSecondDigit] = useState<number>(null)
  const [thirdDigit, setThirdDigit] = useState<number>(null)
  const [serverError, setServerError] = useState('')
  const [answer, setAnswer] = useState<string>('')

  const [updateScore, { isLoading }] = useUpdateScoreMutation()

  const { t, i18n } = useTranslation('translation')

  const onGenerateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * 31) + 1)
    setSecondDigit(Math.floor(Math.random() * 11) + 1)
    setThirdDigit(Math.floor(Math.random() * 11) + 1)
    setAnswer('')
    setRight(false)
    setWrong(false)
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }

  const [right, setRight] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [score, setScore] = useState(0)

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
    console.log(1324)
    const answerToNumber = Number(answer)
    Keyboard.dismiss()
    if (firstDigit + secondDigit + thirdDigit === answerToNumber) {
      setRight(true)
      setScore(score + 1)
      data = { ...data, score: score}
      console.log("data", data)
      setServerError('')
      updateScore(data)
        .unwrap()
        .then(response => {
          reset()
        })
        .catch((e: any) => {
          const serverE = t('errors.serverError')
          const error400 = t('errors.error400')
          const error401 = t('errors.error401')

          if (e.status === 'FETCH_ERROR') setServerError(serverE)
          if (e.status === 400) setServerError(error400)
          if (e.status === 401) setServerError(error401)
        })
      } else {
        setWrong(true)
        setScore(score - 1)
      }
  }

  const onCheck = () => {
    const answerToNumber = Number(answer)
    Keyboard.dismiss()
    if (firstDigit + secondDigit + thirdDigit === answerToNumber) {
      setRight(true)
      setScore(score + 1)
    } else {
      setWrong(true)
      setScore(score - 1)
    }
  }
  console.log(score)

  const onPressPlayMore = () => {
    setRight(false)
    setAnswer('')
    setFirstDigit(Math.floor(Math.random() * 31) + 1)
    setSecondDigit(Math.floor(Math.random() * 11) + 1)
    setThirdDigit(Math.floor(Math.random() * 11) + 1)
  }

  const onPressTryAgain = () => {
    setWrong(false)
    setAnswer('')
  }

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * 31) + 1)
    setSecondDigit(Math.floor(Math.random() * 11) + 1)
    setThirdDigit(Math.floor(Math.random() * 11) + 1)
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <AppLayout title={t('mathOperations.summ')}>
        <>
          <View style={styles.containerMathOperation}>
            <Digit title={firstDigit} />
            <MathOperation title='+' />
            <Digit title={secondDigit} />
            <MathOperation title='+' />
            <Digit title={thirdDigit} />
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
          
          <AlertResult 
            title={'Play more)'} 
            right={right}
            onPress={onPressPlayMore} 
          />
          <AlertResult 
            title={'Oh, noooooooo'}
            wrong={wrong} 
            onPress={onPressTryAgain} 
          />
          
          <Score score={score} />
        </>
      </AppLayout>
    </>
  )
}
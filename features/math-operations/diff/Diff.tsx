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

export const Diff = ({ navigation }) => {
  const [firstDigit, setFirstDigit] = useState<number>(null)
  const [secondDigit, setSecondDigit] = useState<number>(null)
  const [answer, setAnswer] = useState<string>('')

  const { t } = useTranslation('translation')

  const generateNewDigits = () => {
    const firstDigit = Math.floor(Math.random() * 31) + 1
    setFirstDigit(firstDigit)
  
    const secondDigit = Math.floor(Math.random() * firstDigit) + 1
    setSecondDigit(secondDigit)
  }
  

  const onGenerateNewDigits = () => {
    generateNewDigits()
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

  const onCheck = () => {
    const answerToNumber = Number(answer)
    Keyboard.dismiss()
    if (firstDigit - secondDigit === answerToNumber) {
      setRight(true)
      setScore(score + 1)
    } else {
      setWrong(true)
      setScore(score - 1)
    }
  }

  const onPressPlayMore = () => {
    setRight(false)
    setAnswer('')
    generateNewDigits()
  }

  const onPressTryAgain = () => {
    setWrong(false)
    setAnswer('')
  }

  useEffect(() => {
    generateNewDigits()
  }, [])

  return (
    <>
      <AppLayout title={t('mathOperations.summ')}>
        <View>
          <View style={styles.containerMathOperation}>
            <Digit title={firstDigit} />
            <MathOperation title='-' />
            <Digit title={secondDigit} />
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
            <TouchableOpacity style={styles.button} onPress={onCheck}>
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
        </View>
      </AppLayout>
    </>
  )
}
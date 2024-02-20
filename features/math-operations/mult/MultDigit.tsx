import React, { useEffect, useState } from 'react'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './../MathOperations.styles'
import { AlertResult } from '../../../common/components/alerts/AlertResult'
import { Score } from '../../../common/components/score/Score'
import { ResultInput } from '../../../common/components/inputs/ResultInput'
import { Digit } from '../../../common/components/borderedText/borderedText'
import { MathOperation } from '../../../common/components/mathOperation/MathOperation'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../common/components/layouts/AppLayout'

export const MultDigit = ({ navigation, route }) => {
  const { digit } = route.params
  const [firstDigit, setFirstDigit] = useState<number>(null)
  const [answer, setAnswer] = useState<string>('')

  const { t } = useTranslation('translation')

  const onGenerateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
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
    if (firstDigit * digit === answerToNumber) {
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
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }

  const onPressTryAgain = () => {
    setWrong(false)
    setAnswer('')
  }

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }, [])

  return (
    <AppLayout title={t('mathOperations.multBy') + ' ' + digit}>
      <>
        <View style={styles.containerMathOperation}>
          <Digit title={firstDigit} />
          <MathOperation title='*' />
          <Digit title={digit} />
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
      </>
    </AppLayout>
  )
}
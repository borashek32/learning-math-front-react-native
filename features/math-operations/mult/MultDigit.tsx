import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { GoHome } from '../../../common/components/buttons/goHomeButton/goHome';
import { styles } from '../../../common/styles/styles'
import { DefaultButton } from '../../../common/components/buttons/appButtons/DefaultButton';
import { AlertResult } from '../../../common/components/alerts/AlertResult';
import { Score } from '../../../common/components/score/Score';
import { ResultInput } from '../../../common/components/inputs/ResultInput';
import { Digit } from '../../../common/components/borderedText/borderedText';
import { MathOperation } from '../../../common/components/mathOperation/MathOperation';

export const MultDigit = ({ navigation, route }) => {
  const { digit } = route.params

  const [firstDigit, setFirstDigit] = useState<number>(null)
  const [answer, setAnswer] = useState<string>('')

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
    <View style={styles.container}>
      <GoHome navigation={navigation} />

      <Text style={styles.title}>Multiplying by {digit}</Text>
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

      <DefaultButton 
        title='Generate new digit' 
        onPress={onGenerateNewDigits}
      />
      <DefaultButton 
        title='Check' 
        onPress={onCheck}
      />
      
      <AlertResult
        title={'Play more;)'} 
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
  )
}
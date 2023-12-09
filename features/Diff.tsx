import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { MathOperation } from '../common/components/mathOperation/MathOperation';
import { GoHome } from '../common/components/buttons/goHomeButton/goHome';
import { styles } from './../common/styles/styles'
import { Digit } from '../common/components/borderedText/borderedText';
import { AlertResult } from '../common/components/alerts/AlertResult';
import { ResultInput } from '../common/components/inputs/ResultInput';
import { DefaultButton } from '../common/components/buttons/appButtons/DefaultButton';
import { Score } from '../common/components/score/Score';

export const Diff = ({ navigation }) => {

  const [firstDigit, setFirstDigit] = useState<number>(null)
  const [secondDigit, setSecondDigit] = useState<number>(null)
  const [answer, setAnswer] = useState<string>('')

  const generateNewDigits = () => {
    const firstDigit = Math.floor(Math.random() * 21) + 1
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
    <View style={styles.container}>
      <GoHome navigation={navigation} />

      <Text style={styles.title}>Summ of two digits</Text>
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

      <DefaultButton 
        title='Generate new digits' 
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
  );
}
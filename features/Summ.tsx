import React, { useEffect, useState } from 'react';
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export const Summ = ({ navigation }) => {
  const [pressSumm, setPressSumm] = useState(false)

  const [firstDigit, setFirstDigit] = useState<number>(null)
  const [secondDigit, setSecondDigit] = useState<number>(null)
  const [answer, setAnswer] = useState<string>('')

  const onOpenSum = () => {
    setPressSumm(true)
    setRight(false)
    setWrong(false)
    setAnswer('')
  }

  const onCloseSum = () => {
    setPressSumm(false)
    setRight(false)
    setWrong(false)
    setAnswer('')
    setScore(0)
  }

  const onGenerateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * 21))
    setSecondDigit(Math.floor(Math.random() * 21))
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
    if (firstDigit + secondDigit === answerToNumber) {
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
    setFirstDigit(Math.floor(Math.random() * 21))
  }

  const onPressTryAgain = () => {
    setWrong(false)
    setAnswer('')
  }

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * 21))
    setSecondDigit(Math.floor(Math.random() * 21))
  }, [])

  return (
    <View style={styles.container}>
      {!pressSumm &&
        <View style={styles.button}>
          <Button 
            title='Summ two digits' 
            onPress={onOpenSum} 
          />
        </View>
      }
      {pressSumm && 
        <View>
          <View style={[styles.closeButton, styles.buttonBorder]}>
            <Button title='close' onPress={onCloseSum} />
          </View>
          <Text style={styles.title}>Summ of two digits</Text>
          <View style={styles.containerMathOperation}>
            <View style={styles.firstDigit}>
              <Text style={styles.digitsText}>{firstDigit}</Text>
            </View>
            <Text style={[styles.digitsText, {marginTop: 10}]}>+</Text>
            <View style={styles.firstDigit}>
              <Text style={styles.digitsText}>{secondDigit}</Text>
            </View>
            <Text style={[styles.digitsText, {marginTop: 10}]}>=</Text>
            <View style={styles.firstDigit}>
              <TextInput 
                onChangeText={(answer) => onChangeHandler(answer)}
                value={answer}
                keyboardType={"numeric"}
                style={[styles.digitsText, styles.digitInput]}
              />
            </View>
          </View>
          <TouchableOpacity style={[styles.generateButton, styles.buttonBorder]}>
            <Button 
              title='Generate new digits' 
              onPress={onGenerateNewDigits} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.generateButton, styles.buttonBorder]}>
            <Button 
              title='Check' 
              onPress={onCheck}
            />
          </TouchableOpacity>
          {right && 
            <TouchableOpacity style={[styles.alertWrapper, styles.alertGreen]}>
              <Text style={styles.alertText}>Yeah, you are right</Text>
              <View>
                <Button
                  title='Play more:)'
                  onPress={onPressPlayMore}
                />
              </View>
            </TouchableOpacity>
          }
          {wrong && 
            <TouchableOpacity style={[styles.alertWrapper, styles.alertRed]}>
              <Text style={styles.alertText}>Oh, nooooo. Please, try again</Text>
              <View>
                <Button
                  title='Try again'
                  onPress={onPressTryAgain}
                />
              </View>
            </TouchableOpacity>
          }
          <View style={styles.scoreWrapper}>
            <Text style={styles.scoreText}>Your score: {score}</Text>
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100,
  },
  button: {
    width: 200,
    height: 60,
    backgroundColor: 'yellow',
    color: 'white',
    justifyContent: 'center',
  },
  closeButton: {
    width: 100,
    height: 40,
  },
  buttonBorder: {
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    marginTop: 20,
  },
  title: {
    margin: 20,
    fontSize: 24,
  },
  firstDigit: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitsText: {
    fontSize: 34,
  },
  digitInput: {
    width: 40,
    height: 40,
  },
  generateButton: {
    height: 40,
    width: 200,
  },
  containerMathOperation: {
    flexDirection: 'row',
    gap: 20,
  },
  alertText: {
    fontSize: 24,
    color: 'white',
  },
  alertWrapper: {
    marginTop: -150,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  alertRed: {
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: 'red',
  },
  alertGreen: {
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: 'darkgreen',
  },
  scoreWrapper: {
    marginTop: 50,
  },
  scoreText: {
    fontSize: 18,
  }
});
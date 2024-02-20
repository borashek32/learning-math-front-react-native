import React, { useEffect, useState } from 'react';
import { DotsLoader } from '../loaders/DotsLoader';
import { StyleSheet, Text, View } from 'react-native';

export const Logo = () => {
  const [firstDigit, setFirstDigit] = useState(0);
  const [secondDigit, setSecondDigit] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [toggleFlag, setToggleFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFirstDigit(Math.floor(Math.random() * 21) + 1);
      setSecondDigit(Math.floor(Math.random() * 11) + 1);
      setAnswer(null);
    }, 4500)
  }, [toggleFlag]);

  useEffect(() => {
    setTimeout(() => {
      setAnswer(firstDigit + secondDigit);
    }, 2000);
  }, [firstDigit, secondDigit]);

  useEffect(() => {
    setTimeout(() => {
      setToggleFlag(!toggleFlag);
    }, 4500);
  }, [answer]);

  return (
    <View style={styles.logo}>
      <View style={styles.logoWrapper}>
        <View style={styles.learnMathComWrapper}>
          <Text style={styles.learn}>Learn</Text>
          <Text style={styles.mathCom}>-math</Text>
          <Text style={styles.mathCom}>.com</Text>
        </View>
        <View style={styles.digitsWrapper}>
          <Text style={styles.digit}>{firstDigit}</Text>
          <Text style={styles.digit}>+</Text>
          <Text style={styles.digit}>{secondDigit}</Text>
          <Text style={[styles.digit, styles.equalsSign]}> = </Text>
          <Text style={[styles.digit, styles.answer]}>
            {/* {answer !== null ? answer : <DotsLoader />} */}
            {answer !== null ? answer : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  logoWrapper: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  digitsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 160,
    position: 'relative',
  },
  digit: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0d47a1',
  },
  equalsSign: {
  },
  answer: {
  },
  learnMathComWrapper: {
    display: 'flex'
  },
  learn: {
    textAlign: 'left',
    fontSize: 60,
    fontWeight: '900',
    lineHeight: 50,
    marginLeft: -3,
  },
  mathCom: {
    textAlign: 'left',
    fontSize: 34,
    fontWeight: '500',
    lineHeight: 30,
  },
});

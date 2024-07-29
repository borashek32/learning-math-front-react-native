import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    }, 4500);
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
  }, [answer, toggleFlag]);

  return (
    <View style={styles.logo}>
      <View style={styles.logoWrapper}>
        <View style={styles.learnMathComWrapper}>
          <Text style={styles.learn}>Free</Text>
          <Text style={styles.mathCom}>math</Text>
          <Text style={styles.mathCom}>trainer</Text>
        </View>
        <View style={styles.digitsWrapper}>
          <Text style={styles.digit}>{firstDigit}</Text>
          <Text style={styles.digit}>+</Text>
          <Text style={styles.digit}>{secondDigit}</Text>
          <Text style={[styles.digit, styles.equalsSign]}> = </Text>
          <Text style={[styles.digit, styles.answer]}>
            {/* {answer !== null ? answer : <DotsLoader />} */}
            {answer !== null ? answer : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answer: {
  },
  digit: {
    color: "#0d47a1",
    fontSize: 34,
    fontWeight: "700",
  },
  digitsWrapper: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
    position: "relative",
    width: 160,
  },
  equalsSign: {
  },
  learn: {
    fontSize: 52,
    fontWeight: "900",
    lineHeight: 50,
    marginLeft: -3,
    textAlign: "left",
  },
  learnMathComWrapper: {
    display: "flex"
  },
  logo: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  logoWrapper: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    flexDirection: "column",
    height: 200,
    justifyContent: "center",
    width: 200,
  },
  mathCom: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 30,
    textAlign: "left",
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    marginTop: 20,
  },
  title: {
    margin: 20,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
  firstDigit: {
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitsText: {
    fontSize: 34,
    color: '#fff'
  },
  digitInput: {
    width: 80,
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
    color: '#fff',
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
  multDigit: {
    fontSize: 30,
    fontWeight: '700'
  }
});
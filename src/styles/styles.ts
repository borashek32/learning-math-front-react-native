import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  alertGreen: {
    backgroundColor: 'green',
    borderColor: 'darkgreen',
    borderWidth: 1,
  },
  alertRed: {
    backgroundColor: 'pink',
    borderColor: 'red',
    borderWidth: 1,
  },
  alertText: {
    color: '#fff',
    fontSize: 24,
  },
  alertWrapper: {
    alignItems: 'center',
    height: 300,
    justifyContent: 'center',
    marginTop: -150,
    padding: 10,
    width: 300,
  },
  button: {
    backgroundColor: 'yellow',
    color: 'white',
    height: 60,
    justifyContent: 'center',
    width: 200,
  },
  buttonBorder: {
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    marginTop: 20,
  },
  closeButton: {
    height: 40,
    width: 100,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  containerMathOperation: {
    flexDirection: 'row',
    gap: 20,
  },
  digitInput: {
    height: 40,
    width: 80,
  },
  digitsText: {
    color: '#fff',
    fontSize: 34,
  },
  firstDigit: {
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    padding: 10,
  },
  generateButton: {
    height: 40,
    width: 200,
  },
  multDigit: {
    fontSize: 30,
    fontWeight: '700',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    margin: 20,
    textAlign: 'center',
  },
});

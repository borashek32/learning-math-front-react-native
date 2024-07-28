import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff'
  },
  inputsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    width: 350,
    height: 40,
    color: '#fff',
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  button: {
    backgroundColor: "#0D6EFD",
    borderRadius: 4,
    width: 250,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOutlined: {
    backgroundColor: "#fff",
    color: "#0D6EFD",
    borderWidth: 1,
    borderColor: "#0D6EFD",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonTextOutlined: {
    color: "#0D6EFD",
  },
  error: {
    position: 'absolute',
    top: -20,
    color: 'red'
  },
  logoutWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#01143d',
  }
})
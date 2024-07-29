import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#0D6EFD",
    borderRadius: 4,
    display: "flex",
    height: 40,
    justifyContent: "center",
    width: 250,
  },
  buttonOutlined: {
    backgroundColor: "#fff",
    borderColor: "#0D6EFD",
    borderWidth: 1,
    color: "#0D6EFD",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonTextOutlined: {
    color: "#0D6EFD",
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  container: {
    alignItems: "center",
    gap: 20,
    justifyContent: "flex-start",
  },
  error: {
    color: "red",
    position: "absolute",
    top: -20
  },
  input: {
    borderColor: "grey",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    color: "#fff",
    height: 40,
    padding: 5,
    width: 350,
  },
  inputContainer: {
    position: "relative",
  },
  inputsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  logoutWrapper: {
    alignItems: "center",
    backgroundColor: "#01143d",
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    color: "#fff",
    fontSize: 30
  }
});
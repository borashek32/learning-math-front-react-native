import { MathOperationsConstants } from "../constants/MathConstants"

export const getRandomMathOperation = () => {
  const operations = Object.keys(MathOperationsConstants)
  const randomIndex = Math.floor(Math.random() * operations.length)
  const randomOperation = operations[randomIndex]
  return MathOperationsConstants[randomOperation]
}
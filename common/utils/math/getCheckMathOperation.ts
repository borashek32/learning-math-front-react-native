import { MathOperationsConstants } from "../../constants/MathConstants"

export const getCheckMathOperation = (mathOperation: string) => {
  let checkMathOperation: string

  if (mathOperation === MathOperationsConstants.DIFF) {
    checkMathOperation = MathOperationsConstants.SUMM
  } else if (mathOperation === MathOperationsConstants.SUMM) {
    checkMathOperation = MathOperationsConstants.DIFF
  } else if (mathOperation === MathOperationsConstants.MULTIPLY) {
    checkMathOperation = MathOperationsConstants.DIVIDE
  } else if (mathOperation === MathOperationsConstants.DIVIDE) {
    checkMathOperation = MathOperationsConstants.MULTIPLY
  }

  return checkMathOperation
}
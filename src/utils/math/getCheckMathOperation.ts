import { MathOperationsConstants } from '../../constants/MathConstants';

export const getCheckMathOperation = (mathOperation: string) => {
  let checkMathOperation: string = MathOperationsConstants.SUM;

  if (mathOperation === MathOperationsConstants.DIFF) {
    checkMathOperation = MathOperationsConstants.SUM;
  } else if (mathOperation === MathOperationsConstants.SUM) {
    checkMathOperation = MathOperationsConstants.DIFF;
  } else if (mathOperation === MathOperationsConstants.MULTIPLY) {
    checkMathOperation = MathOperationsConstants.DIVIDE;
  } else if (mathOperation === MathOperationsConstants.DIVIDE) {
    checkMathOperation = MathOperationsConstants.MULTIPLY;
  }

  return checkMathOperation;
};

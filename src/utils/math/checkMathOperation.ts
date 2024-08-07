import { FC } from 'react';

import { MathOperationsConstants } from '../../constants/MathConstants';

type Props = {
  answer: number;
  operation: string;
  firstOperand: number;
  secondOperand: number;
  thirdOperand?: number | undefined;
  fourthOperand?: number | undefined;
};

export const checkMathOperation: FC<Props> = ({
  answer,
  operation,
  firstOperand,
  secondOperand,
  thirdOperand,
  fourthOperand,
}: Props): boolean => {
  switch (operation) {
    case MathOperationsConstants.SUM:
      if (
        (firstOperand &&
          secondOperand &&
          firstOperand + secondOperand === answer) ||
        (firstOperand &&
          secondOperand &&
          thirdOperand &&
          firstOperand + secondOperand + thirdOperand === answer) ||
        (firstOperand &&
          secondOperand &&
          thirdOperand &&
          fourthOperand &&
          firstOperand + secondOperand + thirdOperand + fourthOperand ===
            answer)
      ) {
        return true;
      } else {
        return false;
      }

    case MathOperationsConstants.MULTIPLY:
      if (
        firstOperand &&
        secondOperand &&
        firstOperand * secondOperand === answer
      ) {
        return true;
      } else {
        return false;
      }

    default:
      throw new Error('Unsupported operation');
  }
};

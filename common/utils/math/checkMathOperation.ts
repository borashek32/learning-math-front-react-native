import { FC } from "react"
import { MathOperationsConstants } from "../../constants/MathConstants"

type Props = {
  score: number
  answer: number
  operation: string
  firstOperand: number 
  secondOperand: number
  thirdOperand?: number | undefined
  fourthOperand?: number | undefined
}

export const checkMathOperation: FC<Props> = ({
  score,
  answer,
  operation,
  firstOperand,
  secondOperand,
  thirdOperand,
  fourthOperand,
}: Props): boolean => {

  switch (operation) {
    case MathOperationsConstants.SUMM:
      if (
        ((score <= 5) && 
        (firstOperand + secondOperand === answer)) ||
        ((score > 5) && 
        (firstOperand + secondOperand + thirdOperand === answer)) ||
        ((score > 10) && 
        (firstOperand + secondOperand + thirdOperand + fourthOperand === answer))
      ) {
        return true
      } else {
        return false
      }

    case MathOperationsConstants.DIFF:
      if (
        ((score <= 5) && 
        (firstOperand - secondOperand === answer)) ||
        ((score > 5 && score <= 10) && 
        (firstOperand - secondOperand - thirdOperand === answer)) ||
        ((score > 10) && 
        (firstOperand - secondOperand - thirdOperand - fourthOperand === answer))
      ) {
        return true
      } else {
        return false
      }

    // case  MathOperationsConstants.MULTIPLY:
    //   return firstOperand * secondOperand
    case MathOperationsConstants.DIVIDE:
      if (firstOperand === answer) {
        return true
      } else {
        return false
      }
      
    default:
      throw new Error('Unsupported operation')
  }
}

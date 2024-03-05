export const performMathOperation = (operation: string, firstOperand: number, secondOperand: number): number => {
  switch (operation) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      if (secondOperand === 0) {
        throw new Error('Division by zero');
      }
      return firstOperand / secondOperand;
    default:
      throw new Error('Unsupported operation');
  }
};

import { MathOperationsConstants } from '../../constants/MathConstants';

export const getRandomMathOperation = () => {
  const operations = Object.keys(
    MathOperationsConstants,
  ) as (keyof typeof MathOperationsConstants)[];
  const randomIndex = Math.floor(Math.random() * operations.length);
  const randomOperationKey = operations[randomIndex];

  return MathOperationsConstants[randomOperationKey];
};

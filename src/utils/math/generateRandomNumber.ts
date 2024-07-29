export const generateRandomNumber = (min: number, max: number) => {

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// usage example
// const randomNumber = getRandomNumber(1, 10)

export const generateNewRandomNumbers = (score: number) => {
  let first: number;
  let second: number;
  let third: number;
  let fourth: number;
  let sum: number;

  third = 0;
  fourth = 0;

  second = Math.floor(Math.random() * 10);
  if (score > 5) third = Math.floor(Math.random() * 10);
  if (score > 10) fourth = Math.floor(Math.random() * 10);

  sum = second; 
  if (score > 5) sum = second + third;
  if (score > 10) sum = second+ third + fourth;

  first = Math.floor(Math.random() * (sum + 1)) + sum;

  return {
    first,
    second,
    third,
    fourth
  };
};

// Пример использования:
// const numbers = generateNumberGreaterThanSum();
// console.log(numbers);
const generateDigits = (score: number) => {
  let firstDigit: number, 
    secondDigit: number, 
    thirdDigit: number, 
    fourthDigit: number

  if (score > 5) {
    firstDigit = Math.floor(Math.random() * 31) + 1
    secondDigit = Math.floor(Math.random() * 11) + 1
    thirdDigit = Math.floor(Math.random() * 11) + 1
  } else {
    firstDigit = Math.floor(Math.random() * 31) + 1
    secondDigit = Math.floor(Math.random() * 11) + 1
  }

  if (score > 10) {
    firstDigit = Math.floor(Math.random() * 31) + 1
    secondDigit = Math.floor(Math.random() * 11) + 1
    thirdDigit = Math.floor(Math.random() * 11) + 1
    fourthDigit = Math.floor(Math.random() * 11) + 1
  }

  return { firstDigit, secondDigit, thirdDigit, fourthDigit }
}

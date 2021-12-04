function generateRandomNumbers(count, type) {
  const numbers = new Array(count);
  const generatorCb = getRandomGenerator(type);
  for (let i = 0; i < count; i++) {
    numbers[i] = generatorCb();
  }
  return numbers;
}

function getFibonachiNumber(order) {
  if (order < 0) return;
  const word = [0, 1, 1];
  if (word[order] || word[order] === 0) return word[order];
  for (let i = 3; i < order + 1; i++) {
    word.push(word[i - 1] + word[i - 2]);
  }
  return word[word.length - 1];
}

function getRandomGenerator(operator) {
  const r = 17;
  const s = 5;
  const operation = operator;
  const k = 16;
  let next = r;
  const startWord = [];

  switch (operation) {
    case "plus":
    case "xor":
      for (let i = 1; i < r + 1; i++) startWord.push(getFibonachiNumber(i));
      break;
    case "multiply":
      let i = 1;
      while (startWord.length < r) {
        const fibNum = getFibonachiNumber(i++);
        if (fibNum % 2 === 0) continue;
        startWord.push(fibNum);
      }
      break;
  }

  return function () {
    let randomNumber;
    switch (operation) {
      case "plus":
        randomNumber = (startWord[next - r] + startWord[next - s]) % 2 ** k;
        break;
      case "xor":
        randomNumber = (startWord[next - r] ^ startWord[next - s]) % 2 ** k;
        break;
      case "multiply":
        randomNumber = (startWord[next - r] * startWord[next - s]) % 2 ** k;
        break;
    }
    startWord.push(randomNumber);
    next++;
    return randomNumber;
  };
}

export { generateRandomNumbers };

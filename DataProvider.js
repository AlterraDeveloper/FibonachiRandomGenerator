function prepareData(numbers, typeName) {
  switch (typeName) {
    case "distributionHystogram":
      return prepareDataForDistributionHystogram(numbers);
    case "distributionOnPlane":
      return prepareDataForDistributionOnPlane(numbers);
    case "seriesCheck":
      return prepareDataForSeriesCheck(numbers);
    case "monotonyCheck":
      return prepareDataForMonotonyCheck(numbers);
    case "autocorrelationFunction":
      return prepareDataForAutocorrelationFunction(numbers);
    default:
      return null;
  }
}

function prepareDataForDistributionHystogram(numbers) {
  const chartData = numbers.reduce((hashMap, number) => {
    hashMap[number] = hashMap[number] ? hashMap[number] + 1 : 1;
    return hashMap;
  }, {});
  return {
    dataForX: Object.keys(chartData),
    dataForY: Object.values(chartData),
  };
}

function prepareDataForDistributionOnPlane(numbers) {
  return {
    dataForX: numbers.slice(0, numbers.length - 1),
    dataForY: numbers.slice(1),
  };
}

function prepareDataForSeriesCheck(numbers) {
  var binaryNumbersString = numbers
    .map((x) => new Number(x).toString(2).padStart(16, "0"))
    .join("");
  const dataForX = [
    "0",
    "1",
    "",
    "00",
    "01",
    "10",
    "11",
    "",
    "000",
    "001",
    "010",
    "011",
    "100",
    "101",
    "110",
    "111",
  ];
  const dataForY = dataForX.map((x) =>
    x ? binaryNumbersString.match(new RegExp(`${x}`, "gm"))?.length ?? 0 : 0
  );
  return {
    dataForX,
    dataForY,
  };
}

function prepareDataForMonotonyCheck(numbers) {
  var monotonies = [];
  const numbersLength = numbers.length;
  let currentMonotony = [];
  let isAscending = null;
  currentMonotony.push(numbers[0], numbers[1]);
  for (let i = 2; i < numbersLength; i++) {
    const current = numbers[i];
    if (isAscending === null) {
      if (currentMonotony.length >= 2) {
        if (
          currentMonotony[currentMonotony.length - 1] ===
          currentMonotony[currentMonotony.length - 2]
        ) {
          isAscending = null;
          currentMonotony.push(current);
          continue;
        }
        isAscending =
          currentMonotony[currentMonotony.length - 1] >
          currentMonotony[currentMonotony.length - 2];
      } else {
        currentMonotony.push(current);
        continue;
      }
    }

    if (current === currentMonotony[currentMonotony.length - 1]) {
      currentMonotony.push(current);
      continue;
    }

    if (current > currentMonotony[currentMonotony.length - 1]) {
      if (isAscending) {
        currentMonotony.push(current);
      } else {
        monotonies.push(currentMonotony);
        currentMonotony = [];
        currentMonotony.push(current);
        isAscending = null;
      }
    } else {
      if (isAscending) {
        monotonies.push(currentMonotony);
        currentMonotony = [];
        currentMonotony.push(current);
        isAscending = null;
      } else {
        currentMonotony.push(current);
      }
    }
  }
  monotonies.push(currentMonotony);
  console.log(monotonies);

  return {
    dataForX: monotonies.map((x, i) => i + 1),
    dataForY: monotonies.map((x) => x.length),
  };
}

function prepareDataForAutocorrelationFunction(numbers) {
  const numbersAfterBinaryNormalization = Array.from(
    numbers.map((x) => new Number(x).toString(2).padStart(16, "0")).join("")
  ).map((x) => (Number.parseInt(x) ? 1 : -1));

  const denominatorSum = numbersAfterBinaryNormalization.reduce(
    (sum, num) => (sum += num ** 2),
    0
  );
  const numbersLength = numbersAfterBinaryNormalization.length;
  const shiftedNumbersArray = [];

  // получаем массив сдвигов
  for (let i = 0; i <= numbersLength; i++) {
    const shiftedNumbers = [];
    for (let j = 0; j < numbersLength; j++) {
      shiftedNumbers.push(
        numbersAfterBinaryNormalization[(i + j) % numbersLength]
      );
    }
    shiftedNumbersArray.push(shiftedNumbers);
  }

  const numerators = [];
  for (const shiftedArray of shiftedNumbersArray) {
    const numeratorSum =
      shiftedArray.reduce(
        (sum, num, i) => (sum += num * numbersAfterBinaryNormalization[i]),
        0
      ) / denominatorSum;
    numerators.push(Math.round((numeratorSum + Number.EPSILON) * 100) / 100);
  }
  return {
    dataForX: numerators.map((x, i) => i + 1),
    dataForY: numerators,
  };
}

export { prepareData };

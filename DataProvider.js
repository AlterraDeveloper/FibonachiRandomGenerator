function prepareData(numbers, typeName) {
  switch (typeName) {
    case "distributionHystogram":
      return prepareDataForDistributionHystogram(numbers);
    case "distributionOnPlane":
      return prepareDataForDistributionOnPlane(numbers);
    case "seriesCheck":
    case "monotonyCheck":
    case "autocorrelationFunction":
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

export { prepareData };

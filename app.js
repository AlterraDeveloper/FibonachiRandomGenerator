import { generateRandomNumbers } from "./FibonachiRandomGenerator";
import { buildDotedField, buildHystogram } from "./ChartBuilder";
import { prepareData } from "./DataProvider";

const MainForm = document.getElementById("MainForm");
const submitFormButton = document.getElementById("submitForm");
const canvasWrapper = document.getElementById("canvasWrapper");

submitFormButton.onclick = () => {
  const numbersCount = document.getElementById("numbersCount");
  const generationMethodType = document.getElementById("generationMethodType");
  const testMethodType = document.getElementById("testMethodType");

  const chartDisplayName = `${
    testMethodType.options[testMethodType.selectedIndex].text
  } ${
    generationMethodType.options[generationMethodType.selectedIndex].text
  } для ${numbersCount.value} элементов`;

  const randomNumbers = generateRandomNumbers(
    Number.parseInt(numbersCount.value),
    generationMethodType.value
  );

  canvasWrapper.innerHTML = "";
  const canvas = document.createElement("canvas");
  canvasWrapper.appendChild(canvas);

  const chartData = prepareData(randomNumbers, testMethodType.value);

  console.log(chartData);
  switch (testMethodType.value) {
    case "distributionHystogram":
    case "seriesCheck":
    case "monotonyCheck":
    case "autocorrelationFunction":
      buildHystogram(
        chartData.dataForX,
        chartData.dataForY,
        canvas,
        chartDisplayName
      );
      break;
    case "distributionOnPlane":
      buildDotedField(
        chartData.dataForX,
        chartData.dataForY,
        canvas,
        chartDisplayName
      );
      break;

    default:
      break;
  }
};

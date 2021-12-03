import Chart from "chart.js/auto";

const fibonachiGeneratorPlus = getRandomGenerator("+");
const fibonachiGeneratorXor = getRandomGenerator("^");
const fibonachiGeneratorMultiply = getRandomGenerator("*");

const textForPlus = document.querySelector("#block-plus");
const textForMulti = document.querySelector("#block-multi");
const textForXor = document.querySelector("#block-xor");
const textForStandart = document.querySelector("#block-standart");

const btnForPlus = document.querySelector("#block-generate-btn-plus");
const btnForMulti = document.querySelector("#block-generate-btn-multi");
const btnForXor = document.querySelector("#block-generate-btn-xor");
const btnForStandart = document.querySelector("#block-generate-btn-standart");

btnForPlus.onclick = () => {
  const numbers = generateRandomNumbers(1000000, fibonachiGeneratorXor);
  console.log(numbers);
  const chartData = numbers.reduce((hashMap, number) => {
    hashMap[number] = hashMap[number] ? hashMap[number] + 1 : 1;
    return hashMap;
  }, {});
  console.log(chartData);
  drawChart({
    valuesByX: Object.keys(chartData),
    valuesByY: Object.values(chartData),
    displayName: "Гистограмма распределения элементов",
  });
};
btnForMulti.onclick = () => {
  textForMulti.innerText += `${fibonachiGeneratorMultiply()}\n`;
};
btnForXor.onclick = () => {
  textForXor.innerText += `${fibonachiGeneratorXor()}\n`;
};
btnForStandart.onclick = () => {
  textForStandart.innerText += `${Math.random()}\n`;
};




function drawChart({ valuesByX, valuesByY, displayName }) {
}


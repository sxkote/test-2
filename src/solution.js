// const cTitle = 1;
const cPower = 2;
const cWeight = 6;
const cPrice = 7;

function normolizeData(data) {
  return data.map((row) => [
    '',
    row[1],
    Number(row[2]),
    Number(row[3]),
    Number(row[4]),
    Number(row[5]),
    Number(row[6]),
    Number(row[7]),
  ]);
}

function calcTotalRowsCount(data) {
  return data.length;
}

function sortDataByColumn(data, index) {
  return data.sort((a, b) => (a[index] > b[index] ? -1 : 1));
}

function sortDataByStrength(data) {
  return sortDataByColumn(data, cPower);
}

function sortDataByWeight(data) {
  return sortDataByColumn(data, cWeight);
}

function calculatePowerByMoney(item, money) {
  const count = Math.floor(money / item[cPrice]);
  return count * item[cPower];
}

export {
  normolizeData,
  calcTotalRowsCount,
  sortDataByStrength,
  sortDataByWeight,
  calculatePowerByMoney,
};

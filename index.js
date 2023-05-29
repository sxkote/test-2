#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs';
import parseCSVData from './src/utils.js';
import {
  normolizeData,
  calcTotalRowsCount,
  sortDataByStrength,
  sortDataByWeight,
  calculatePowerByMoney,
} from './src/solution.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');

// BEGIN
console.log(content);

// 0 parse & normolize data
const data = normolizeData(parseCSVData(content, 1));
// console.dir(data);

// 1
const amount = calcTotalRowsCount(data);
console.log(`1. Всего: ${amount}`);

// 2
const sortedPower = sortDataByStrength(data);
console.log(`2. Стоимость 10 самых сильных: ${10 * sortedPower[0][7]} (${sortedPower[0][1]})`);
console.log(`2. Стоимость 20 вторых по силе: ${20 * sortedPower[1][7]} (${sortedPower[1][1]})`);

// 3
const sortedWeight = sortDataByWeight(data);
console.log(
  `3. Стоимость отряда самых толстых: ${sortedWeight[0][4] * sortedWeight[0][7]} (${
    sortedWeight[0][1]
  })`,
);
console.log(
  `3. Стоимость отряда самых худых: ${sortedWeight[amount - 1][4] * sortedWeight[amount - 1][7]} (${
    sortedWeight[amount - 1][1]
  })`,
);

// 4
const dEffect = data
  .map((item) => [item[1], item[2], item[7], item[2] <= 0 ? 0 : item[7] / item[2]])
  .sort((a, b) => (a[3] < b[3] ? -1 : 1));
console.log(
  `4. Самые выгодные: ${dEffect[0][0]} (${dEffect[0][1]}:${dEffect[0][2]} => ${dEffect[0][3]})`,
);
console.log(
  `4. Самые НЕвыгодные: ${dEffect[amount - 1][0]} (${dEffect[amount - 1][1]}:${
    dEffect[amount - 1][2]
  } => ${dEffect[amount - 1][3]})`,
);

// 5
const money = 10000;
const dArmy = data
  .map((item) => [item[1], item[2], item[7], calculatePowerByMoney(item, money)])
  .sort((a, b) => (a[3] < b[3] ? 1 : -1));
console.log(`5. Самая сильная армия на ${money} денег: ${dArmy[0][0]}: ${dArmy[0][3]}`);
// END

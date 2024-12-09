import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const operands = ["+", "*", "||"];

const equations = input.replaceAll(": ", "=").split("\r\n");

const makeCombinations = (equations) => {
  let results = [];

  equations.forEach((equation) => {
    let queue = [equation];

    while (queue.length > 0) {
      let curr = queue.shift();

      if (curr.indexOf(" ") === -1) {
        results.push(curr);
      } else {
        operands.forEach((operand) => {
          queue.push(curr.replace(" ", operand));
        });
      }
    }
  });

  return results;
};

const formatFormula = (formula) => {
  return formula.match(/(\d+|\+|\*|\|\|)/g);
};

const calculate = (equals, formula) => {
  let result = +formula[0];
  for (let i = 1; i < formula.length - 1; i += 2) {
    switch (formula[i]) {
      case "+":
        result = result + +formula[i + 1];
        break;
      case "*":
        result = result * +formula[i + 1];
        break;
      case "||":
        result = result + formula[i + 1];
        result = +result;
        break;
    }
  }
  return +equals === result;
};

const combinations = makeCombinations(equations).map((x) => ({
  equals: x.split("=")[0],
  formula: formatFormula(x.split("=")[1]),
}));

const results = combinations
  .filter((combination) => calculate(combination.equals, combination.formula))
  .map((combination) => combination.equals);

console.log([...new Set(results)].reduce((aggr, curr) => aggr + +curr, 0));

const endTime = performance.now();
console.log(
  `Execution time of 2024/08/2.js took ${endTime - startTime} milliseconds`
);

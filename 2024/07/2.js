import { readFileSync, writeFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const operands = ["+", "*", "||"];

const equations = input.replaceAll(": ", "=").split("\r\n");

const makeCombinations = (arr, i) => {
  let curr = arr[i];
  if (i == arr.length) {
    return arr;
  }

  operands.forEach((operand) => {
    if (curr.indexOf(" ") != -1) {
      arr.push(curr.replace(" ", operand));
    }
  });

  return makeCombinations(arr, i + 1);
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

const combinations = makeCombinations(equations, 0)
  .filter((x) => x.indexOf(" ") == -1)
  .map((x) => ({
    equals: x.split("=")[0],
    formula: formatFormula(x.split("=")[1]),
  }));

const results = combinations
  .filter((combination) => calculate(combination.equals, combination.formula))
  .map((combination) => combination.equals);

console.log([...new Set(results)].reduce((aggr, curr) => aggr + +curr, 0));

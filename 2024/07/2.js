import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const operands = ["+", "*", "||"];

const equations = input.replaceAll(": ", "=").split("\r\n");

// const makeCombinations = (equations) => {
//   let results = [];

//   equations.forEach((equation) => {
//     let queue = [equation];

//     while (queue.length > 0) {
//       let curr = queue.shift();

//       if (curr.indexOf(" ") === -1) {
//         results.push(curr);
//       } else {
//         operands.forEach((operand) => {
//           queue.push(curr.replace(" ", operand));
//         });
//       }
//     }
//   });

//   return results;
// };

const formatFormula = (formula) => {
  return formula.match(/(\d+|\+|\*|\|\|)/g);
};

const calculate = (combination, index, maximum) => {
  const { equals, formula } = combination;
  console.log(`Processing ${index}/${maximum}: ${JSON.stringify(combination)}`);

  let result = +formula[0];
  for (let i = 1; i < formula.length - 1; i += 2) {
    if (result > +equals) {
      return false;
    }
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

// const combinations = makeCombinations(equations);
// const mappedCombinations = combinations.map((x) => ({
//   equals: x.split("=")[0],
//   formula: formatFormula(x.split("=")[1]),
// }));

// const results = mappedCombinations
//   .filter((combination) => calculate(combination))
//   .map((combination) => combination.equals);

// console.log([...new Set(results)].reduce((aggr, curr) => aggr + +curr, 0));

const resultSet = new Set();

equations.forEach((equation, i) => {
  let queue = [equation];

  while (queue.length > 0) {
    let curr = queue.shift();

    if (curr.indexOf(" ") === -1) {
      const formatted = {
        equals: curr.split("=")[0],
        formula: formatFormula(curr.split("=")[1]),
      };
      if (calculate(formatted, i + 1, equations.length)) {
        resultSet.add(formatted.equals);
        continue;
      }
    } else {
      operands.forEach((operand) => {
        queue.push(curr.replace(" ", operand));
      });
    }
  }
});

console.log(resultSet.values().reduce((aggr, curr) => aggr + +curr, 0));

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

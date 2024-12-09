import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const formatFunction = (arr, signs) => {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = signs[i - 1] === "0" ? result + arr[i] : result * arr[i];
  }
  return result;
};

const equations = input
  .split("\r\n")
  .map((x) => x.split(": "))
  .map((x) => {
    return {
      result: +x[0],
      numbers: x[1].split(" ").map((y) => +y),
    };
  });

let result = 0;
equations.forEach((equation) => {
  const length = equation.numbers.length - 1;
  const combinations = Array.from({ length: Math.pow(2, length) }, (_, i) =>
    i.toString(2).padStart(length, "0")
  );
  for (const combination of combinations) {
    if (
      formatFunction(equation.numbers, combination.split("")) ===
      equation.result
    ) {
      result += equation.result;
      break;
    }
  }
});
console.log(result);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

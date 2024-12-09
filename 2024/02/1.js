import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const isSafe = (row) => {
  const rowValues = row.split(" ").map((x) => parseInt(x));
  let isIncreasing = false,
    isDecreasing = false;
  for (let i = 0; i < rowValues.length - 1; i++) {
    if (!isIncreasing && !isDecreasing) {
      rowValues[i] < rowValues[i + 1]
        ? (isIncreasing = true)
        : (isDecreasing = true);
    }

    if (
      (isIncreasing && rowValues[i] >= rowValues[i + 1]) ||
      Math.abs(rowValues[i] - rowValues[i + 1]) < 1 ||
      Math.abs(rowValues[i] - rowValues[i + 1]) > 3
    ) {
      return false;
    }

    if (
      (isDecreasing && rowValues[i] <= rowValues[i + 1]) ||
      Math.abs(rowValues[i] - rowValues[i + 1]) < 1 ||
      Math.abs(rowValues[i] - rowValues[i + 1]) > 3
    ) {
      return false;
    }
  }
  return true;
};

const rows = input.split("\n");
const safeRows = rows.filter(isSafe);
console.log(safeRows.length);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

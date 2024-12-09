import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const isSafe = (row) => {
  let isIncreasing = false,
    isDecreasing = false;

  for (let i = 0; i < row.length - 1; i++) {
    if (!isIncreasing && !isDecreasing) {
      row[i] < row[i + 1] ? (isIncreasing = true) : (isDecreasing = true);
    }

    if (
      (isIncreasing && row[i] >= row[i + 1]) ||
      Math.abs(row[i] - row[i + 1]) < 1 ||
      Math.abs(row[i] - row[i + 1]) > 3
    ) {
      return false;
    }

    if (
      (isDecreasing && row[i] <= row[i + 1]) ||
      Math.abs(row[i] - row[i + 1]) < 1 ||
      Math.abs(row[i] - row[i + 1]) > 3
    ) {
      return false;
    }
  }
  return true;
};

const rows = input
  .split("\n")
  .map((row) => row.split(" ").map((x) => parseInt(x)));
const safeRows = rows.filter((row) => isSafe(row));
const unsafeRows = rows.filter((row) => !isSafe(row));
const doubleCheck = unsafeRows
  .map((row) => {
    let result = [];
    for (let i = 0; i < row.length; i++) {
      result.push(isSafe(row.slice(0, i).concat(row.slice(i + 1))));
    }
    return result.includes(true);
  })
  .filter((x) => x === true);
console.log(safeRows.length + doubleCheck.length);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

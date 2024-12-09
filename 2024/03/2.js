import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const mul = [
  ...input.matchAll(
    /mul\((\d+),(\d+)\)(?<=(?:^|do\(\))(?:[^d]|d(?!on't\(\)))+?)/g
  ),
];

console.log(mul.map(([, a, b]) => +a * +b).reduce((r, e) => r + e));

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

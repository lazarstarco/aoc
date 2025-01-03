import { readFileSync, writeFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

let blinks = 75;
let stones = input.split(" ").map((stone) => +stone);

// code

console.log(`Result: ${stones.length}`);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

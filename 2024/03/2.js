import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const mul = [
  ...input.matchAll(
    /mul\((\d+),(\d+)\)(?<=(?:^|do\(\))(?:[^d]|d(?!on't\(\)))+?)/g
  ),
];

console.log(mul.map(([, a, b]) => +a * +b).reduce((r, e) => r + e));

import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const mul = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
console.log(mul.map(([, a, b]) => +a * +b).reduce((r, e) => r + e));

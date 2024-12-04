import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
let left = [],
  right = [];

[...input.matchAll(/(\d+)\s+(\d+)/g)]
  .map(([, a, b]) => [+a, +b])
  .forEach((x) => {
    left.push(x[0]);
    right.push(x[1]);
  });

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b);

let result = 0;
for (let i = 0; i < left.length; i++) {
  result += Math.abs(left[i] - right[i]);
}

console.log(result);

import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const map = input.split("").map((n) => parseInt(n));

function inARow(arr, i) {
  let count = 1;
  let j = i + 1;
  while (arr[i] === arr[j]) {
    j++;
    count++;
  }
  return count;
}

let indices = map.flatMap((val, i) =>
  Array(val).fill(i % 2 === 0 ? i / 2 : ".")
);

for (let curr = Math.ceil(map.length / 2) - 1; curr >= 0; curr--) {
  let currInd = indices.indexOf(curr),
    len = inARow(indices, currInd);
  for (let j = 0; j < currInd; j++) {
    if (indices[j] === "." && inARow(indices, j) >= len) {
      indices.splice(currInd, len, ...Array(len).fill("."));
      indices.splice(j, len, ...Array(len).fill(curr));
      break;
    }
  }
}

console.log(
  `Result: ${indices
    .map((x) => (x !== "." ? +x : 0))
    .reduce((aggr, curr, i) => i * curr + aggr, 0)}`
);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

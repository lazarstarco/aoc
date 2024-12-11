import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const sequence = input.split("");

const isFormatted = (arr) => {
  return /^\d+\.+$/.test(arr.join(""));
};

const map = [];
let mapIndex = 0;
for (let i = 0; i < sequence.length; i++) {
  for (let j = 0; j < sequence[i]; j++) {
    if (i % 2 == 0) {
      map.push(mapIndex.toString());
    } else {
      map.push(".");
    }
  }

  if (i % 2 == 0) {
    mapIndex++;
  }
}

const getBeginning = () => {
  for (let i = 0; i < map.length; i++) {
    if (map[i] == ".") {
      return i;
    }
  }
  return map.length - 1;
};

const getEnd = () => {
  for (let i = map.length - 1; i > 0; i--) {
    if (map[i] != ".") {
      return i;
    }
  }
  return 0;
};

while (!isFormatted(map)) {
  const beginning = getBeginning();
  const end = getEnd();
  const temp = map[beginning];
  map[beginning] = map[end];
  map[end] = temp;
}

console.log(
  `Result: ${map
    .map((x) => (x !== "." ? +x : 0))
    .reduce((aggr, curr, i) => i * curr + aggr, 0)}`
);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

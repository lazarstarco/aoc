import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const toMap = (input) => {
  const map = [];
  input = input.split("\r\n");
  for (let i = 0; i < input.length; i++) {
    map[i] = input[i].split("");
  }
  return map;
};

const checkForMAS = (map, x, y) => {
  const up_left = map[x - 1][y - 1] === "M" && map[x + 1][y + 1] === "S";
  const up_right = map[x - 1][y + 1] === "M" && map[x + 1][y - 1] === "S";
  const down_left = map[x + 1][y - 1] === "M" && map[x - 1][y + 1] === "S";
  const down_right = map[x + 1][y + 1] === "M" && map[x - 1][y - 1] === "S";

  const up = up_left && up_right;
  const down = down_left && down_right;
  const left = up_left && down_left;
  const right = up_right && down_right;

  return up || down || left || right;
};

const map = toMap(input);
const lettersA = [];
for (let i = 1; i < map.length - 1; i++) {
  for (let j = 1; j < map[i].length - 1; j++) {
    if (map[i][j] === "A") {
      lettersA.push([i, j]);
    }
  }
}

console.log(
  lettersA.reduce((acc, val) => acc + checkForMAS(map, val[0], val[1]), 0)
);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

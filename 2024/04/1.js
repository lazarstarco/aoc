import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const directions = {
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
  up: [0, -1],
  up_right: [1, -1],
  down_right: [1, 1],
  down_left: [-1, 1],
  up_left: [-1, -1],
};

const xmas = ["X", "M", "A", "S"];

const toMap = (input) => {
  const map = [];
  input = input.split("\r\n");
  for (let i = 0; i < input.length; i++) {
    map[i] = input[i].split("");
  }
  return map;
};

const analyzeX = (map, x, y) => {
  let result = 0;
  for (const direction in directions) {
    result += iterate(map, x, y, directions[direction]);
  }
  return result;
};

const iterate = (map, x, y, direction) => {
  const nextX = x + direction[0];
  const nextY = y + direction[1];
  const nextXmas = xmas[xmas.indexOf(map[x][y]) + 1];
  if (map[x][y] === xmas[xmas.length - 1]) {
    return 1;
  }
  if (
    isOutOfBounds(map, nextX, nextY) ||
    map[nextX][nextY] !== nextXmas ||
    nextXmas === undefined
  ) {
    return 0;
  }
  return 1 * iterate(map, nextX, nextY, direction);
};

const isOutOfBounds = (map, x, y) => {
  return x < 0 || y < 0 || x >= map[0].length || y >= map.length;
};

const findX = (map) => {
  const result = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === xmas[0]) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

const listX = findX(toMap(input));

console.log(
  listX.reduce((acc, val) => acc + analyzeX(toMap(input), val[0], val[1]), 0)
);

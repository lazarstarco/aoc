import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const getStartPoints = (map) => {
  const points = [];
  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 0) {
        points.push({ x: rowIndex, y: colIndex });
      }
    });
  });
  return points;
};

const isWithinTheBounds = (map, x, y) => {
  return x >= 0 && y >= 0 && x < map.length && y < map[0].length;
};

const explore = (map, current, x, y) => {
  const directions = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];

  if (current === 9) {
    return 1;
  }

  for (const direction of directions) {
    const nextX = x + direction.x;
    const nextY = y + direction.y;
    if (
      isWithinTheBounds(map, nextX, nextY) &&
      current + 1 === map[nextX][nextY]
    ) {
      return explore(map, current + 1, nextX, nextY);
    }
  }

  return 0;
};

const topologicalMap = input
  .split("\r\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

const startPoints = getStartPoints(topologicalMap);

let result = 0;
startPoints.forEach(
  (point) =>
    (result += explore(
      topologicalMap,
      topologicalMap[point.x][point.y],
      point.x,
      point.y
    ))
);

console.log(`Result: ${result}`);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const map = input.split(/\r?\n/).map((line) => line.split(""));
const visited = Array.from({ length: map.length }, () =>
  new Array(map[0].length).fill(false)
);

const isAllVisited = () => {
  return visited.every((row) => row.every((cell) => cell));
};

const analyzeCell = (i, j) => {
  const calculateCell = (i, j) => {
    let cellResult = 0;
    cellResult += i - 1 < 0 || map[i - 1][j] !== map[i][j] ? 1 : 0;
    cellResult += j - 1 < 0 || map[i][j - 1] !== map[i][j] ? 1 : 0;
    cellResult += j + 1 >= map[0].length || map[i][j + 1] !== map[i][j] ? 1 : 0;
    cellResult += i + 1 >= map.length || map[i + 1][j] !== map[i][j] ? 1 : 0;
    return cellResult;
  };

  visited[i][j] = true;

  let result = { count: 1, calc: calculateCell(i, j) };

  if (i - 1 >= 0 && map[i - 1][j] === map[i][j] && !visited[i - 1][j]) {
    const analysis = analyzeCell(i - 1, j);
    result = {
      count: result.count + analysis.count,
      calc: result.calc + analysis.calc,
    };
  }
  if (j - 1 >= 0 && map[i][j - 1] === map[i][j] && !visited[i][j - 1]) {
    const analysis = analyzeCell(i, j - 1);
    result = {
      count: result.count + analysis.count,
      calc: result.calc + analysis.calc,
    };
  }
  if (
    j + 1 < map[0].length &&
    map[i][j + 1] === map[i][j] &&
    !visited[i][j + 1]
  ) {
    const analysis = analyzeCell(i, j + 1);
    result = {
      count: result.count + analysis.count,
      calc: result.calc + analysis.calc,
    };
  }
  if (i + 1 < map.length && map[i + 1][j] === map[i][j] && !visited[i + 1][j]) {
    const analysis = analyzeCell(i + 1, j);
    result = {
      count: result.count + analysis.count,
      calc: result.calc + analysis.calc,
    };
  }

  return result;
};

let i = 0;
let j = 0;
let finalResult = 0;
while (!isAllVisited()) {
  const finalAnalysis = analyzeCell(i, j);
  finalResult += finalAnalysis.count * finalAnalysis.calc;
  for (i = 0; i < map.length; i++) {
    let foundUnvisited = false;
    for (j = 0; j < map[0].length; j++) {
      if (!visited[i][j]) {
        foundUnvisited = true;
        break;
      }
    }
    if (foundUnvisited) {
      break;
    }
  }
}

console.log(finalResult);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

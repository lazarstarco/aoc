import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const print = (fig) => {
  const curr = Object.keys(fig).includes("figure") ? fig.figure : fig;

  curr.forEach((row) => {
    row.forEach((col) => {
      process.stdout.write((col === "." ? " " : col) + " ");
    });
    process.stdout.write("\n");
  });
  process.stdout.write("\n");
};

const countEdges = (fig, i, j, letter) => {
  let count = 0;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const isOutOfBounds = (i, j) => {
    return i < 0 || i >= fig.length || j < 0 || j >= fig[i].length;
  };

  directions.forEach(([di, dj]) => {
    const ni = i + di,
      nj = j + dj;

    if (isOutOfBounds(ni, nj)) {
      count++;
    } else if (fig[ni][nj] !== letter) {
      count++;
    }
  });

  return count;
};

const formatFigure = (map, letter) => {
  const figure = [...Array(map.length)].map(() => [Array(map.length).fill("")]);
  let found = false;

  map.forEach((row, i) =>
    row.forEach((col, j) => {
      if (col !== letter) {
        figure[i][j] = ".";
      }
      if (col !== letter && found) {
        return;
      }
      if (col === letter) {
        found = true;
        figure[i][j] = letter;
      }
    })
  );

  return figure;
};

const map = input.split(/\r?\n/).map((x) => x.split(""));
const visited = [...Array(map.length)].map(() => [
  Array(map.length).fill(false),
]);
let flatMap = map.flatMap((x) => x);

print(map);

const figures = [];
let letter = undefined;
do {
  letter = flatMap.find((x) => x !== ".");
  const figure = formatFigure(map, letter);

  figures.push({ letter, figure });
  flatMap = flatMap.filter((x) => x !== letter);
} while (letter !== undefined);
figures.splice(figures.length - 1);

const results = [];

figures.forEach((currentFigure) => {
  const result =
    currentFigure.figure
      .flatMap((x) => x)
      .filter((x) => x === currentFigure.letter).length *
    currentFigure.figure
      .map((row, i) =>
        row.map((col, j) =>
          col === currentFigure.letter
            ? countEdges(currentFigure.figure, i, j, currentFigure.letter)
            : 0
        )
      )
      .flatMap((x) => x)
      .reduce((aggr, curr) => aggr + curr, 0);
  console.log(
    "Letter:",
    currentFigure.letter,
    "Figure size:",
    currentFigure.figure
      .flatMap((x) => x)
      .filter((x) => x === currentFigure.letter).length,
    "Result: ",
    result
  );

  print(currentFigure);
  results.push(result);
});

console.log(`Final result: ${results.reduce((aggr, curr) => aggr + curr, 0)}`);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

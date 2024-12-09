import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const DIRECTIONS = [
  { character: "^", step: { i: -1, j: 0 } },
  { character: ">", step: { i: 0, j: 1 } },
  { character: "v", step: { i: 1, j: 0 } },
  { character: "<", step: { i: 0, j: -1 } },
];

const map = input.split("\r\n").map((x) => x.split(""));

const printMap = () => {
  map.forEach((row) => {
    row.forEach((col) => process.stdout.write(col + " "));
    console.log();
  });
};

const getResult = () => {
  let result = 0;
  map.forEach((row) => {
    row.forEach((col) => (result += col === "X" ? 1 : 0));
  });
  return result;
};

const findGuard = () => {
  let position = false;
  map.forEach((row, i) =>
    row.forEach((col, j) => {
      if (DIRECTIONS.map((x) => x.character).includes(col)) {
        position = { character: col, i, j };
      }
    })
  );
  return position;
};

const getDirection = (char) => {
  return DIRECTIONS.filter((x) => x.character === char)[0];
};

const isOutOfBounds = (i, j) => {
  return i < 0 || j < 0 || i >= map.length || j >= map[0].length;
};

const redrawMap = (curr) => {
  const direction = getDirection(curr.character);
  let nextI = curr.i + direction.step.i;
  let nextJ = curr.j + direction.step.j;

  map[curr.i][curr.j] = "X";

  if (isOutOfBounds(nextI, nextJ)) {
    return;
  }

  if (map[nextI][nextJ] !== "#") {
    map[nextI][nextJ] = direction.character;
  } else {
    const index =
      DIRECTIONS.findIndex((x) => x.character === direction.character) + 1;
    const nextDirection = index < 4 ? DIRECTIONS[index] : DIRECTIONS[0];
    nextI = curr.i + nextDirection.step.i;
    nextJ = curr.j + nextDirection.step.j;
    map[nextI][nextJ] = nextDirection.character;
  }
};

const loop = () => {
//   printMap();

  if (findGuard() === false) {
    console.log(`\nResult: ${getResult()}`);
    return;
  }

//   setTimeout(() => {
    process.stdout.write("\x1Bc");
    redrawMap(findGuard(map));
    loop();
//   }, 650);
};

loop();
import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const parseArray = (arr) => {
  return arr
    .split(/\r?\n/)
    .filter((x) => x !== "")
    .map((x) => x.match(/X.(\d+), Y.(\d+)/).slice(1, 3))
    .map((x) => ({ x: parseInt(x[0]), y: parseInt(x[1]) }));
};

const populateMachines = (arr) => {
  const machines = [];
  let i = 0;
  let iA = 0;
  let machine;
  do {
    if (i === 0) {
      machine = {};
      machine.a = { x: arr[iA].x, y: arr[iA++].y };
      i++;
    } else if (i === 1) {
      machine.b = { x: arr[iA].x, y: arr[iA++].y };
      i++;
    } else {
      machine.result = { x: arr[iA].x, y: arr[iA++].y };
      machines.push(machine);
      i = 0;
    }
  } while (iA !== arr.length);

  return machines;
};

const calculateMachine = (machine) => {
  const originalA = { x: machine.a.x, y: machine.a.y };
  const originalB = { x: machine.b.x, y: machine.b.y };
  const originalResult = { x: machine.result.x, y: machine.result.y };

  machine.a.x = originalA.x * originalB.y;
  machine.b.x = originalB.x * originalB.y;
  machine.result.x = originalResult.x * originalB.y;

  machine.a.y = originalA.y * (-1 * originalB.x);
  machine.b.y = originalB.y * (-1 * originalB.x);
  machine.result.y = originalResult.y * (-1 * originalB.x);

  const timesToPushA =
    (machine.result.x + machine.result.y) / (machine.a.x + machine.a.y);
  const timesToPushB =
    (originalResult.x - originalA.x * timesToPushA) / originalB.x;

  const result = timesToPushA * 3 + timesToPushB;
  console.log(timesToPushA);
  console.log(timesToPushB);

  console.log(result);

  if (timesToPushA > 100 || timesToPushB > 100 || result % 1 !== 0) {
    return -1;
  }

  return timesToPushA * 3 + timesToPushB;
};

const main = () => {
  const parsedArray = parseArray(input);
  const machines = populateMachines(parsedArray);

  let total = 0;
  for (const machine of machines) {
    const result = calculateMachine(machine);
    if (result !== -1) {
      total += result;
    }
  }

  console.log(total);
};

main();

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

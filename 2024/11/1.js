import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

let blinks = 25;
let stones = input.split(" ").map((stone) => +stone);
console.log(stones);

while (blinks-- > 0) {
  const newStones = [];
  for (let i = 0; i < stones.length; i++) {
    if (stones[i] === 0) {
      newStones.push(1);
    } else if (stones[i].toString().length % 2 === 0) {
      const firstHalf = +stones[i]
        .toString()
        .split("")
        .splice(0, stones[i].toString().length / 2)
        .join("");
      const secondHalf = +stones[i]
        .toString()
        .split("")
        .splice(stones[i].toString().length / 2)
        .join("");
      newStones.push(firstHalf);
      newStones.push(secondHalf);
    } else {
      newStones.push(stones[i] * 2024);
    }
  }
  stones = newStones;
  console.log(stones);
}

console.log(`Result: ${stones.length}`);

const endTime = performance.now();
console.log(
  `Execution time of ${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took ${endTime - startTime} milliseconds`
);

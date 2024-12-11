import { readFileSync } from "fs";
import { performance } from "perf_hooks";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

const operands = ["+", "*", "||"];
const equations = input.replaceAll(": ", "=").split("\r\n");

const formatFormula = (formula) => {
  return formula.match(/(\d+|\+|\*|\|\|)/g);
};

const calculate = (combination) => {
  const { equals, formula } = combination;

  let result = BigInt(formula[0]);

  for (let i = 1; i < formula.length; i += 2) {
    if (result > BigInt(equals)) {
      return false;
    }
    switch (formula[i]) {
      case "+":
        result += BigInt(formula[i + 1]);
        break;
      case "*":
        result *= BigInt(formula[i + 1]);
        break;
      case "||":
        result = BigInt(String(result) + formula[i + 1]);
        break;
    }
  }
  return BigInt(equals) === result;
};

const processBatch = async (batch, batchIndex, totalBatches) => {
  console.log(`Batch ${batchIndex + 1}/${totalBatches} started`);
  const resultSet = new Set();

  for (const equation of batch) {
    let queue = [equation];

    while (queue.length > 0) {
      let curr = queue.shift();

      if (curr.indexOf(" ") === -1) {
        const formatted = {
          equals: curr.split("=")[0],
          formula: formatFormula(curr.split("=")[1]),
        };
        if (calculate(formatted)) {
          resultSet.add(formatted);
          console.log(
            `Value ${JSON.stringify(formatted)} added to the result set`
          );
        }
      } else {
        operands.forEach((operand) => {
          queue.push(curr.replace(" ", operand));
        });
      }
    }
  }

  console.log(`Batch ${batchIndex + 1}/${totalBatches} completed`);
  return resultSet;
};

const chunkSize = 50;
const batches = [];
for (let i = 0; i < equations.length; i += chunkSize) {
  batches.push(equations.slice(i, i + chunkSize));
}

const main = async () => {
  const batchPromises = batches.map((batch, index) =>
    processBatch(batch, index, batches.length)
  );

  const results = await Promise.all(batchPromises);

  const combinedResults = new Set();
  results.forEach((resultSet) => {
    resultSet
      .values()
      .map((item) => ({
        equals: item.equals,
        formula: item.formula.filter((_, index) => index % 2 === 0),
      }))
      .forEach((item) => combinedResults.add(JSON.stringify(item)));
  });

  const finalSum = Array.from(combinedResults)
    .map((item) => JSON.parse(item))
    .reduce((aggr, curr) => aggr + BigInt(curr.equals), BigInt(0));
  console.log(`Final Sum: ${finalSum.toString()}`);

  const endTime = performance.now();
  console.log(
    `Execution time: ${(endTime - startTime).toFixed(2)} milliseconds`
  );
};

main().catch((err) => console.error(err));

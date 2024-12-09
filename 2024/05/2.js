import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const pages = [];
const rulesBefore = new Map();
const rulesAfter = new Map();

const checkRules = (page, p) => {
  let correct = true;
  const checkBefore = page.slice(
    0,
    page.findIndex((x) => x === p)
  );

  const checkAfter = page.slice(page.findIndex((x) => x === p) + 1);

  rulesBefore.get(p)?.forEach((x) => {
    if (checkAfter.includes(x)) {
      correct = false;
    }
  });

  rulesAfter.get(p)?.forEach((x) => {
    if (checkBefore.includes(x)) {
      correct = false;
    }
  });

  return correct;
};

const splitInput = input.split("\r\n");

splitInput.forEach((x) => {
  if (/\d\|\d/.test(x)) {
    const rule = x.split("|");

    if (rulesBefore.has(rule[1])) {
      rulesBefore.get(rule[1]).push(rule[0]);
    } else {
      rulesBefore.set(rule[1], [rule[0]]);
    }

    if (rulesAfter.has(rule[0])) {
      rulesAfter.get(rule[0]).push(rule[1]);
    } else {
      rulesAfter.set(rule[0], [rule[1]]);
    }
  } else if (x !== "") {
    pages.push(x.split(","));
  }
});

pages
  .filter((page) => !page.map((p) => checkRules(page, p)).includes(false))
  .map((x) => +x.slice(x.length / 2, x.length / 2 + 1))
  .reduce((agg, curr) => (agg += curr));

const incorrectPages = pages.filter((page) =>
  page.map((p) => checkRules(page, p)).includes(false)
);

console.log(incorrectPages);

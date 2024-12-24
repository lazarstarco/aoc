import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { execSync } from "child_process";
import { format } from "date-fns";

// Check if a number argument is passed, otherwise use the current day
const number = process.argv[2] || format(new Date(), "dd");

if (isNaN(number)) {
  console.error("The argument should be a valid number or the current date.");
  process.exit(1);
}

// Use the provided number (or current day) to create the directory
mkdirSync(number);

// Create files 1.js, 2.js, and input.txt
const files = ["1.js", "2.js", "input.txt"];
const fileContent = `import { readFileSync } from "fs";

const startTime = performance.now();
const input = readFileSync("input.txt", "utf8");

// code

const endTime = performance.now();
console.log(
  \`Execution time of \${process.argv[1].substring(
    process.argv[1].indexOf("aoc")
  )} took \${endTime - startTime} milliseconds\`
);`;

files.forEach((file) => {
  writeFileSync(`${number}/${file}`, file === "input.txt" ? "" : fileContent);
});

// Run npm init -y in the folder
execSync("npm init -y", { cwd: `./${number}` });

// Add '"type": "module"' to package.json
const packageJsonPath = `./${number}/package.json`;
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
packageJson.type = "module";
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Setup completed for directory ${number}`);

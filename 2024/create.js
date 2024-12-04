import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { execSync } from "child_process";
import { format } from "date-fns";

const today = format(new Date(), "dd");
mkdirSync(today);

// Create files 1.js, 2.js and input.txt
const files = ["1.js", "2.js", "input.txt"];
const fileContent = `import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");`;

files.forEach((file) => {
  writeFileSync(`${today}/${file}`, file === "input.txt" ? "" : fileContent);
});

// Run npm init -y in the folder
execSync("npm init -y", { cwd: `./${today}` });

// Add '"type": "module"' to package.json
const packageJsonPath = `./${today}/package.json`;
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
packageJson.type = "module";
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

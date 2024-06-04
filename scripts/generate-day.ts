import commandLineArgs from "command-line-args";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const options = commandLineArgs([
  {
    name: "year",
    alias: "y",
    type: Number,
    defaultValue: Number(process.env.YEAR),
  },
  {
    name: "day",
    alias: "d",
    type: Number,
    defaultValue: Number(process.env.DAY),
  },
]);

const { year, day } = options;

console.info(`Generating ${year} Day ${day} files from template...`);

const codeTemplate = fs
  .readFileSync("./src/templates/day.template.txt")
  .toString()
  .replace(/\$\$DAY\$\$/g, day)
  .replace(/\$\$YEAR\$\$/g, year);

const specTemplate = fs
  .readFileSync("./src/templates/day.spec.template.txt")
  .toString()
  .replace(/\$\$DAY\$\$/g, day)
  .replace(/\$\$YEAR\$\$/g, year);

try {
  fs.writeFileSync(`./src/${year}/day.${day}.ts`, codeTemplate);
  fs.writeFileSync(`./src/${year}/day.${day}.spec.ts`, specTemplate);

  console.info("Created files successfully!");
} catch (error: any) {
  console.error("Failed to create files: ", error.message);
}

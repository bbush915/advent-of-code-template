const parseArguments = require("command-line-args");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const options = parseArguments([
  { name: "day", type: Number, defaultValue: Number(process.env.DAY) },
]);

const { day } = options;

console.info(`Generating Day ${day} file from template...`);

const template = fs.readFileSync("./src/day.template.js").toString();
const data = template.replace("$$DAY$$", day);

try {
  fs.writeFileSync(`./src/day.${day}.js`, data);
  console.info("Created file successfully!");
} catch (error) {
  console.error("Failed to create file: ", error.message);
}

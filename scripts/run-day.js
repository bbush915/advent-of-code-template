const parseArguments = require("command-line-args");
const dotenv = require("dotenv");

dotenv.config();

const options = parseArguments([
  { name: "day", type: Number, defaultValue: Number(process.env.DAY) },
  { name: "part", alias: "p", type: Number },
]);

const { day, part } = options;

if (part && ![1, 2].includes(part)) {
  console.error("Invalid Part specified. If present, must be 1 or 2.");
  return;
}

const { part1, part2 } = require(`../src/day.${day}`);

console.info(`----- Day ${day} -----`);

if (part !== 2) {
  const { result: p1Answer, timeElapsed: p1TimeElapsed } = timePart(part1);
  console.info(`Part 1: ${p1Answer} [${p1TimeElapsed} ms]`);
}

if (part !== 1) {
  const { result: p2Answer, timeElapsed: p2TimeElapsed } = timePart(part2);
  console.info(`Part 2: ${p2Answer} [${p2TimeElapsed} ms]`);
}

function timePart(getResult) {
  const start = new Date().getTime();

  const result = getResult();

  return { result, timeElapsed: new Date().getTime() - start };
}

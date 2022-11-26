const axios = require("axios").default;
const parseArguments = require("command-line-args");
const dotenv = require("dotenv");
const fs = require("fs");
const url = require("url");

dotenv.config();

const options = parseArguments([
  { name: "year", type: Number, defaultValue: Number(process.env.YEAR) },
  { name: "day", type: Number, defaultValue: Number(process.env.DAY) },
  { name: "part", alias: "p", type: Number, defaultValue: 1 },
]);

const { year, day, part } = options;

if (part && ![1, 2].includes(part)) {
  console.error("Invalid Part specified. If present, must be 1 or 2.");
  return;
}

console.info(`Submitting answer for ${year} Day ${day} Part ${part}...`);

const { part1, part2 } = require(`../src/day.${day}`);

const getResult = part === 1 ? part1 : part2;
const result = getResult();

const answersPath = `./src/day.${day}.answers.json`;

if (!fs.existsSync(answersPath)) {
  fs.writeFileSync(answersPath, JSON.stringify({ history: [] }));
}

const answers = JSON.parse(fs.readFileSync(answersPath));

if (answers.history.some((x) => x.answer === result)) {
  console.error("This answer was already submitted!");
  return;
}

const params = new url.URLSearchParams({ level: part, answer: result });

axios
  .post(
    `https://adventofcode.com/${year}/day/${day}/answer`,
    params.toString(),
    {
      headers: {
        cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  .then((response) => {
    if (response.data.includes("That's not the right answer")) {
      console.error("That's not the right answer.");
    } else {
      console.info("Correct!!");
    }

    answers.history.push({ timestamp: new Date().getTime(), answer: result });
  })
  .catch((error) => {
    console.error("Failed to submit answer: ", error.message);
  })
  .finally(() => {
    fs.writeFileSync(answersPath, JSON.stringify(answers));
  });

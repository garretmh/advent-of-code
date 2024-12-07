#!/usr/bin/env -S deno run --allow-read

// Load the input
const inputFile = "./example.txt";
const input = await Deno.readTextFile(
  new URL(import.meta.resolve(inputFile)),
);

// Parse the input
const [rulesInput, updatesInput] = input.trim().split("\n\n");

const rules = rulesInput.split("\n").map((line) => line.split("|").map(Number));
const pageDependencies: Record<number, number[]> = {};
for (const rule of rules) {
  pageDependencies[rule[1]] ??= [];
  pageDependencies[rule[1]].push(rule[0]);
}

const updatesRaw = updatesInput
  .split("\n")
  .map((line) => line.split(",").map(Number));

const updatesValid = [];
const updatesInvalid = [];
for (const update of updatesRaw) {
  // Invalid if the page is the left number of a rule and the right number is later in the update.
  const mustNotSee = new Set<number>();
  const valid = update.every((page) => {
    // console.debug(`page: ${page}  | mustNotSee: ${[...mustNotSee]}`);
    if (mustNotSee.has(page)) {
      return false;
    }
    for (const rightNumber of pageDependencies[page] ?? []) {
      mustNotSee.add(rightNumber);
    }
    return true;
  });
  if (valid) {
    updatesValid.push(update);
  } else {
    updatesInvalid.push(update);
  }
}
// console.debug(updatesValid);

const middlePages = updatesValid.map((update) =>
  update[(update.length - 1) / 2]
);
const sumOfMiddlePages = middlePages.reduce((a, b) => a + b, 0);

console.log("sum of middle pages:");
console.log(sumOfMiddlePages);

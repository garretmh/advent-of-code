#!/usr/bin/env -S deno run --allow-read

// Load the input
const inputFile = "./input.txt";
const input = await Deno.readTextFile(
  new URL(import.meta.resolve(inputFile)),
);

// Parse the input
const mulPattern = /mul\((\d\d?\d?),(\d\d?\d?)\)/g;

console.log("Sum of all mul() calls:");
console.log(
  // Find all instances of mul(#,#)
  input.matchAll(mulPattern)
    // Multiply the left and right inputs of each mul call
    .map(([_match, left, right]) => parseInt(left) * parseInt(right))
    // Add the results of the mul calls together
    .reduce((a, b) => a + b, 0),
);

//
const instructionPattern = /do\(\)|don't\(\)|mul\((\d\d?\d?),(\d\d?\d?)\)/g;

let enabled = true;
let results = 0;
for (const match of input.matchAll(instructionPattern)) {
  const [instruction, left, right] = match;
  if (instruction === "do()") {
    enabled = true;
    continue;
  }
  if (instruction === "don't()") {
    enabled = false;
    continue;
  }
  if (!enabled) {
    continue;
  }
  const result = parseInt(left) * parseInt(right);
  results += result;
}

console.log("Sum of enabled mul() calls:");
console.log(results);

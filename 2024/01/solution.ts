#!/usr/bin/env -S deno run --allow-read

// Load the input
const inputFile = "./input.txt";
const input = await Deno.readTextFile(
  new URL(import.meta.resolve(inputFile)),
);

// Parse the input into two lists
const leftList = [];
const rightList = [];
for (const line of input.split("\n")) {
  const [left, right] = line.split("   ");
  leftList.push(Number(left));
  rightList.push(Number(right));
}

// Sort the lists
leftList.sort();
rightList.sort();

// Calculate the distances
let totalDistance = 0;
for (let i = 0; i < leftList.length; i++) {
  const left = leftList[i];
  const right = rightList[i];
  const distance = Math.abs(left - right);
  totalDistance += distance;
}

console.log("Distance:");
console.log(totalDistance);

// Calculate the similarity
let similarityScore = 0;
for (const left of leftList) {
  let matches = 0;
  for (const right of rightList) {
    if (left === right) {
      matches += 1;
    }
  }
  similarityScore += left * matches;
}

console.log("Similarity:");
console.log(similarityScore);

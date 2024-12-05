#!/usr/bin/env -S deno run --allow-read

// Load the input
const inputFile = "./input.txt";
const input = await Deno.readTextFile(
  new URL(import.meta.resolve(inputFile)),
);

// Parse the input
const grid = input.split("\n");
const rows = grid.length;
const cols = grid[0].length;

let count = 0;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (
      (i + 3) < rows &&
      grid[i + 0][j] === "X" &&
      grid[i + 1][j] === "M" &&
      grid[i + 2][j] === "A" &&
      grid[i + 3][j] === "S"
    ) {
      count++;
    }
    if (
      (i - 3) > -1 &&
      grid[i - 0][j] === "X" &&
      grid[i - 1][j] === "M" &&
      grid[i - 2][j] === "A" &&
      grid[i - 3][j] === "S"
    ) {
      count++;
    }

    if (
      (j + 3) < cols &&
      grid[i][j + 0] === "X" &&
      grid[i][j + 1] === "M" &&
      grid[i][j + 2] === "A" &&
      grid[i][j + 3] === "S"
    ) {
      count++;
    }
    if (
      (j - 3) > -1 &&
      grid[i][j - 0] === "X" &&
      grid[i][j - 1] === "M" &&
      grid[i][j - 2] === "A" &&
      grid[i][j - 3] === "S"
    ) {
      count++;
    }

    if (
      (i + 3) < rows &&
      (j + 3) < cols &&
      grid[i + 0][j + 0] === "X" &&
      grid[i + 1][j + 1] === "M" &&
      grid[i + 2][j + 2] === "A" &&
      grid[i + 3][j + 3] === "S"
    ) {
      count++;
    }
    if (
      (i + 3) < rows &&
      (j - 3) > -1 &&
      grid[i + 0][j - 0] === "X" &&
      grid[i + 1][j - 1] === "M" &&
      grid[i + 2][j - 2] === "A" &&
      grid[i + 3][j - 3] === "S"
    ) {
      count++;
    }
    if (
      (i - 3) > -1 &&
      (j + 3) < cols &&
      grid[i - 0][j + 0] === "X" &&
      grid[i - 1][j + 1] === "M" &&
      grid[i - 2][j + 2] === "A" &&
      grid[i - 3][j + 3] === "S"
    ) {
      count++;
    }
    if (
      (i - 3) > -1 &&
      (j - 3) > -1 &&
      grid[i - 0][j - 0] === "X" &&
      grid[i - 1][j - 1] === "M" &&
      grid[i - 2][j - 2] === "A" &&
      grid[i - 3][j - 3] === "S"
    ) {
      count++;
    }
  }
}

console.log("XMAS:");
console.log(count);

let x_mas_count = 0;
for (let i = 1; i < (rows - 1); i++) {
  for (let j = 1; j < (cols - 1); j++) {
    if (grid[i][j] !== "A") continue;
    const lu = grid[i - 1][j - 1];
    const ru = grid[i + 1][j - 1];
    const ld = grid[i - 1][j + 1];
    const rd = grid[i + 1][j + 1];
    if (
      (
        (lu === "M" && rd === "S") ||
        (lu === "S" && rd === "M")
      ) && (
        (ru === "M" && ld === "S") ||
        (ru === "S" && ld === "M")
      )
    ) {
      x_mas_count++;
    }
  }
}

console.log("X-MAS:");
console.log(x_mas_count);

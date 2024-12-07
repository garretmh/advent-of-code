#!/usr/bin/env -S deno run --allow-read

// Load the input
const inputFile = "./input.txt";
const input = await Deno.readTextFile(
  new URL(import.meta.resolve(inputFile)),
);

// Parse the input
const guard = {
  facing: "N",
  x: -1,
  y: -1,
};
const board = input.split("\n").map((row, y) =>
  row.split("").map((col, x) => {
    if (col === "^") {
      guard.x = x;
      guard.y = y;
      return "X";
    }
    return col as "#" | ".";
  })
);

function renderBoard(b: typeof board) {
  return b.map((x) => x.join("")).join("\n") + "\n";
}

while (true) {
  // console.debug(renderBoard(board));
  let nextY;
  let nextX;
  let nextFace;
  switch (guard.facing) {
    case "N":
      nextY = guard.y - 1;
      nextX = guard.x;
      nextFace = "E";
      break;
    case "S":
      nextY = guard.y + 1;
      nextX = guard.x;
      nextFace = "W";
      break;
    case "E":
      nextY = guard.y;
      nextX = guard.x + 1;
      nextFace = "S";
      break;
    case "W":
      nextY = guard.y;
      nextX = guard.x - 1;
      nextFace = "N";
      break;
    default:
      throw new TypeError();
  }
  const next = board[nextY]?.[nextX];
  if (next === undefined) {
    break;
  }
  if (next === "#") {
    guard.facing = nextFace;
    continue;
  }
  guard.y = nextY;
  guard.x = nextX;
  board[nextY][nextX] = "X";
}
// console.debug(renderBoard(board));

const steps = board.flat().filter((cell) => cell === "X").length;
console.log("Steps:");
console.log(steps);

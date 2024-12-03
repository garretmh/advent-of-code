#!/usr/bin/env -S deno run --allow-read

// Load the input
const inputFile = "./input.txt";
const input = await Deno.readTextFile(
  new URL(import.meta.resolve(inputFile)),
);

// Parse the input
const reports = input
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => line.split(" ").map(Number));

// Verify reports
function isReportSafe(report: number[]): boolean {
  const diff = report[0] - report[1];
  if (diff === 0) {
    return false;
  }
  const asc = diff > 0;
  for (let i = 1; i < report.length; i++) {
    const prevLevel = report[i - 1];
    const currLevel = report[i];
    const diff = prevLevel - currLevel;
    if (asc ? (diff < 1 || diff > 3) : (diff > -1 || diff < -3)) {
      return false;
    }
  }
  return true;
}
const safeReports = reports.filter(isReportSafe);

console.log("Safe reports:");
console.log(safeReports.length);

// Verify reports with Problem Dampener:
function isReportSafeWithDampener(report: number[]): boolean {
  return (
    isReportSafe(report) ||
    report.some((_, i) => isReportSafe(report.toSpliced(i, 1)))
  );
}
const safeReportsWithDampener = reports.filter(isReportSafeWithDampener);

console.log("Safe reports (with Problem Dampener):");
console.log(safeReportsWithDampener.length);

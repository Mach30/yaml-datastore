#!/usr/bin/env node
import { argv } from "node:process";
import { parseArgs } from "node:util";
import { generateIDs } from "../dist/index.js";

const INVALID_INPUT_ERROR = "Error: Invalid input";

const args = argv.slice(2);
const numArgs = args.length;

// Print help text for no args or --help flag
if (numArgs == 0 || args.includes("--help")) {
  console.log("Usage: yds-ids <n> [OPTIONS]");
  console.log("");
  console.log("  Generate a given number of yaml-datastore list IDs");
  console.log("");
  console.log("Options:");
  console.log("  --skip, -s <n>     number of IDs to skip before generating");
  console.log("");
  console.log("Examples:");
  console.log("  $ yds-ids 5");
  console.log("  $ yds-ids 5 -s 2");
  console.log("");
  process.exit(0);
}

const options = {
  numSkip: { type: "string", short: "s" },
};

const parser = parseArgs({ options, allowPositionals: true, args: args });

const numIDs = parseInt(parser.positionals[0]);

let numSkip = 0;
if (parser.values.numSkip) {
  numSkip = parseInt(parser.values.numSkip);
}

if (Number.isNaN(numIDs) || Number.isNaN(numSkip)) {
  console.error(INVALID_INPUT_ERROR);
  if (Number.isNaN(numIDs)) {
    console.error("numIDs = ", numIDs);
  }
  if (Number.isNaN(numSkip)) {
    console.error("numSkip = ", numSkip);
  }
  process.exit(1);
}

const ids = generateIDs(numIDs, numSkip);
ids.forEach((val) => {
  console.log(val);
});

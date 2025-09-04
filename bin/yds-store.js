#!/usr/bin/env node
import { argv } from "node:process";
import { parseArgs } from "node:util";
import { store } from "../dist/index.js";
import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";

const INVALID_FORMAT_ERROR = "Error: Invalid format";

const args = argv.slice(2);
const numArgs = args.length;

// Print help text for no args or --help flag
if (numArgs == 0 || args.includes("--help")) {
  console.log("Usage: yds-store <path-to-yaml-or-json-file> [OPTIONS]");
  console.log("");
  console.log(
    "  Convert YAML or JSON file to on-disk yaml-datastore representation"
  );
  console.log("");
  console.log("Options:");
  console.log(
    "  --working-dir, -w <working-directory>  relative or absolute path to an empty working directory (defaults to current working directory) to store element in"
  );
  console.log(
    "  --element-name, -e <element-name>      name of element to store (defaults to simple filename w/o extension of the path to file to store)"
  );
  console.log("");
  console.log("Examples:");
  console.log("  $ yds-store model.json");
  console.log("  $ yds-store model.json -w ./my-project");
  console.log("  $ yds-store model.json -e myElement");
  console.log("  $ yds-store model.json -w ./my-project -e myElement");
  console.log("");
  process.exit(0);
}

const options = {
  workingDirPath: { type: "string", short: "w" },
  elementName: { type: "string", short: "e" },
};

const parser = parseArgs({ options, allowPositionals: true, args: args });

const elementFilePath = path.resolve(parser.positionals[0]);
const elementContents = fs.readFileSync(elementFilePath, "utf-8");
let element = "";
if (path.extname(elementFilePath) === ".json") {
  element = JSON.parse(elementContents);
} else if (path.extname(elementFilePath) === ".yaml") {
  element = yaml.load(elementContents);
}

let workingDirPath = "";
if (parser.values.workingDirPath) {
  workingDirPath = path.resolve(parser.values.workingDirPath);
} else {
  workingDirPath = path.resolve(".");
}
if (!fs.existsSync(workingDirPath)) {
  fs.mkdirSync(workingDirPath);
}

let elementName = "";
if (parser.values.elementName) {
  elementName = parser.values.elementName;
} else {
  elementName = path.basename(elementFilePath, path.extname(elementFilePath));
}

const storeResult = store(element, workingDirPath, elementName);

if (storeResult.success) {
  console.log(storeResult.message);
} else {
  console.error(storeResult.message);
  process.exit(1);
}

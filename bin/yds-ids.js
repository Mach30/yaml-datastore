#!/usr/bin/env node
import { generateIDs } from "../dist/index.js"
import { argv } from 'node:process';

const numArgs = argv.length - 2;

// Print help text for no args or --help flag
if ( numArgs == 0 || argv[2] == "--help" ) {
    console.log("Generate yaml-datastore list IDs")
    console.log("")
    console.log("USAGE")
    console.log("  $ yds-ids numIDs [numSkip]")
    console.log("")
    console.log("OPTIONS")
    console.log("  numIDs       number of IDs to generate")
    console.log("  numSkip      number of IDs to skip before generating")
    console.log("")
}

const numIDs = parseInt(argv[2]);
const numSkip = numArgs == 2 ? parseInt(argv[3]) : 0; 

if (isNaN(numIDs) || isNaN(numSkip)) {
    console.error("Invalid input")
    console.error("numIDs = ", argv[2])
    if (numArgs == 2) {
        console.error("numSkip = ", argv[3])
    }
    process.exit(1)
}

const ids = generateIDs(numIDs, numSkip);
ids.forEach((val) => {
    console.log(val);
});

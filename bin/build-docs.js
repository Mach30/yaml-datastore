#!/usr/bin/env node

import sh from "shelljs";
import path from "path";

// 1.2. generate all of the spec dir README.md files
// 2.0. one time generations
// 2.1. run typedoc
// 2.2. generate project README.md that includes everything

const TREE_FILE_NAME = ".model_tree.txt";
const SPEC_DIR = "test/spec";

function generateModelTreeFile(specDirPath) {
  sh.cd(specDirPath);
  sh.cmd("tree", "model", "--noreport", "-o", TREE_FILE_NAME);
}

// 1.0. for each spec dir
// get list of spec directories
let specDirs = sh.ls(SPEC_DIR);
specDirs.pop(); // remove last entry since it is `spec.md`
const projectDirPath = sh.pwd().toString();

specDirs.forEach((specDirPath) => {
  // 1.1. generate all of the spec dir tree files
  generateModelTreeFile(path.join(projectDirPath, SPEC_DIR, specDirPath));
});

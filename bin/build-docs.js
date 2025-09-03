#!/usr/bin/env node

import sh from "shelljs";
import path from "path";

const TREE_FILE_NAME = ".model_tree.txt";
const SPEC_DIR = "test/spec";
const sedFixIncludes = "s/```/\\n```/g";

function generateModelTreeFile(specDirPath) {
  sh.cd(specDirPath);
  sh.cmd("tree", "model", "--noreport", "-o", TREE_FILE_NAME);
}

function generateReadmeFile(specDirPath) {
  sh.cd(specDirPath);
  if (sh.ls("-A").stdout.includes(".readme.md")) {
    sh.cmd("markedpp", ".readme.md")
      .cmd("sed", sedFixIncludes)
      .cmd("tr", "-s", "\n")
      .to("README.md");
  }
}

// 1.0. for each spec dir
// get list of spec directories
let specDirs = sh.ls(SPEC_DIR);
specDirs.pop(); // remove last entry since it is `spec.md`
const projectDirPath = sh.pwd().toString();

console.log("Generating Example Tree Views and READMEs");
specDirs.forEach((specDirPath) => {
  // 1.1. generate all of the spec dir tree files
  generateModelTreeFile(path.join(projectDirPath, SPEC_DIR, specDirPath));
  // 1.2. generate all of the spec dir README.md files
  generateReadmeFile(path.join(projectDirPath, SPEC_DIR, specDirPath));
});

// 2.0. one time generations
// 2.1. run typedoc
console.log("Generating TypeDoc README");
sh.cmd("npm", "exec", "typedoc");

// manually remove breadcrumbs from typedoc generated files
// for some reason the hideBreadcrumbs option is not working
let mdFilesToFix = sh.cmd(
  "find",
  path.join(projectDirPath, "docs"),
  "-name",
  "*.md"
);

mdFilesToFix
  .toString()
  .split("\n")
  .forEach((mdFile) => {
    let sedChange = "1,4d";
    sh.cmd("sed", "-i", sedChange, mdFile);
  });

// 2.2. generate project README.md that includes everything
console.log("Generating Project README");
sh.cd(projectDirPath);
sh.cmd("markedpp", ".readme.md")
  .cmd("sed", sedFixIncludes)
  .cmd("tr", "-s", "\n")
  .to("./docs/README.md");

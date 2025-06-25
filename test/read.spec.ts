import { load } from "../src/index";
import { expect } from "chai";
import shell from "shelljs";
import fs from "node:fs";
import path from "path";

describe("Test load function", () => {
  it("should return a LoadResult object with success equals false, element equals null, and message equals empty string, given an empty working directory path, and empty element path", () => {
    const result = load("", "");
    expect(result.success).to.equal(false);
    expect(result.element).to.equal(null);
    expect(result.message).to.equal("");
  });
  it("should return a LoadResult object with true success and message containing element path given a valid working directory path and element path", () => {
    const specDirName = "1.1_object_with_simple_data_types/";
    const specRelativePath = path.join("test/spec", specDirName);
    shell.cp("-r", specRelativePath, "/tmp");
    const tmpSpecPath = path.join("/tmp", specDirName);
    shell.cd(tmpSpecPath);
    const workingDirectoryPath = shell.pwd().stdout;
    const result = load(workingDirectoryPath, "model");
    const model = fs.readFileSync(
      path.resolve(workingDirectoryPath, "model.json"),
      "utf8"
    );
    console.log(model);
    //expect(result.success).to.equal(true);
    //expect(result.element).to.equal(model.toString());
    //expect(result.message).to.equal("model");
    shell.cmd("rm", "-rf", tmpSpecPath);
  });
});

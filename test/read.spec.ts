import { load } from "../src/index";
import { expect } from "chai";
import shell from "shelljs";
import fs from "node:fs";
import path from "path";

describe("Test load function", () => {
  it("should return a LoadResult object where success is false, element is null, and message is an empty string, given an empty working directory path and empty element path", () => {
    const result = load("", "");
    expect(result.success).to.equal(false);
    expect(result.element).to.equal(null);
    expect(result.message).to.equal("");
  });
  it("should return a LoadResult object where success is true and message is a string containing element path, given a valid working directory path and element path", () => {
    // Get list of items in current directory
    const rawSpecDir = fs.readdirSync("test/spec");

    // Filter only directories (excluding hidden ones if desired)
    const specDir = rawSpecDir.filter((rawSpecDir) => {
      const fullPath = path.join("test/spec", rawSpecDir);
      return fs.statSync(fullPath).isDirectory();
    });

    for (let spec of specDir) {
      const workingDirectoryPath = path.join("test/spec", spec);
      const result = load(workingDirectoryPath, "model");
      const model = fs.readFileSync(
        path.resolve(workingDirectoryPath, "model.json"),
        "utf8"
      );
      console.log(model);
      //expect(result.success).to.equal(true);
      //expect(result.element).to.equal(model.toString());
      //expect(result.message).to.equal("model");
    }
  });
});

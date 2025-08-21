import { store } from "../src/index";
import {
  INVALID_ELEMENT_NAME,
  INVALID_PATH_ERROR,
  NONEMPTY_WORKINGDIR_PATH_ERROR,
} from "../src/store";
import { expect } from "chai";
import fs from "node:fs";
import path from "path";

//TODO run checksum for contents written to disk
/*
1. select spec case
2. load model.json from spec case into memory
3. store to directory in /tmp/
4. compare checksums stored version from spec case and written version in /tmp/ and assert checksums are the same
5. load contents in directory in /tmp/
6. compare model.json from case against in-memory model loaded from /tmp/
*/
describe("Test basic store function", () => {
  it("should error when working directory path does not exist", () => {
    const element = {};
    const workingDir = "test/spec/does_not_exist";
    const elementName = "model";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(INVALID_PATH_ERROR));
  });
  it("should error when working directory path exists, but non-empty", () => {
    const element = {};
    const workingDir = "test/spec/1.1_object_with_simple_data_types";
    const elementName = "model";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(NONEMPTY_WORKINGDIR_PATH_ERROR));
  });
  it("should error when element name starts with a digit", () => {
    const workingDir = "/tmp/myproject";
    fs.mkdirSync(workingDir);
    const element = {};
    const elementName = "1model";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(INVALID_ELEMENT_NAME));
    fs.rmdirSync(workingDir);
  });
  it("should error when element name contains a special character (except for underscores and dollar signs)", () => {
    const workingDir = "/tmp/myproject";
    fs.mkdirSync(workingDir);
    const element = {};
    const elementName = "model!";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(INVALID_ELEMENT_NAME));
    fs.rmdirSync(workingDir);
  });
});

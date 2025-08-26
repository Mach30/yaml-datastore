import { store } from "../src/index";
import {
  INVALID_ELEMENT_NAME,
  INVALID_PATH_ERROR,
  NONEMPTY_WORKINGDIR_PATH_ERROR,
  reserved_keywords,
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

const TMP_WORKING_DIR_PATH = "/tmp/my-project";
let workingDir = "";

function toJsonString(o: Object): string {
  return JSON.stringify(o, null, 2);
}

function runBasicStoreTest(specCaseName: string) {
  const specCasePath = path.join("test/spec", specCaseName);
  const element = JSON.parse(
    fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
  );
  const elementName = "model";
  const expectedFilePath = path.join(TMP_WORKING_DIR_PATH, elementName, "_this.yaml")
  const result = store(element, workingDir, elementName);
  expect(result.success).to.equal(true);
  expect(result.message).to.equal(expectedFilePath);
  const resultContents = fs.readFileSync(path.resolve(result.message), "utf-8")
  const specCaseFilePath = path.join(specCasePath, elementName, "_this.yaml")
  const expectedResultContents = fs.readFileSync(path.resolve(specCaseFilePath), "utf-8")
  expect(resultContents).to.equal(expectedResultContents)
}

describe("Test basic store function", () => {
  beforeEach(function () {
    workingDir = TMP_WORKING_DIR_PATH;
    fs.mkdirSync(workingDir);
  });
  afterEach(function () {
    fs.rmSync(TMP_WORKING_DIR_PATH, { recursive: true, force: true });
  });
  it("should error when working directory path does not exist", () => {
    const element = {};
    workingDir = "test/spec/does_not_exist";
    const elementName = "model";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(INVALID_PATH_ERROR));
  });
  it("should error when working directory path exists, but non-empty", () => {
    const element = {};
    workingDir = "test/spec/1.1_object_with_simple_data_types";
    const elementName = "model";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(NONEMPTY_WORKINGDIR_PATH_ERROR));
  });
  it("should error when element name starts with a digit", () => {
    const element = {};
    const elementName = "1model";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(INVALID_ELEMENT_NAME));
  });
  it("should error when element name contains a special character (except for underscores and dollar signs)", () => {
    const element = {};
    const elementName = "model!";
    const result = store(element, workingDir, elementName);
    expect(result.success).to.equal(false);
    expect(result.message)
      .to.be.a("string")
      .and.satisfy((msg) => msg.startsWith(INVALID_ELEMENT_NAME));
  });
  it("should error when element name is a reserved keyword in javascript", () => {
    for (const elementName of reserved_keywords) {
      const element = {};
      const result = store(element, workingDir, elementName);
      expect(result.success).to.equal(false);
      expect(result.message)
        .to.be.a("string")
        .and.satisfy((msg) => msg.startsWith(INVALID_ELEMENT_NAME));
    }
  });
  it("should store object with simple data types", () => {
    runBasicStoreTest("1.1_object_with_simple_data_types");
  });
  it("should store object with complex string", () => {
    runBasicStoreTest("1.2.1_object_with_complex_string");
  });
  it("should store object with object of simple data types", () => {
    runBasicStoreTest("1.2.2_object_with_object_of_simple_data_types");
  });
  it("should store object with object of complex data types", () => {
    runBasicStoreTest("1.2.3_object_with_object_of_complex_data_types");
  });
  it("should store object with list of simple data type", () => {
    runBasicStoreTest("1.2.4_object_with_list_of_simple_data_type");
  });
  it("should store object with list of simple data types", () => {
    runBasicStoreTest("1.2.5_object_with_list_of_simple_data_types");
  });
  it("should store object with list of complex strings", () => {
    runBasicStoreTest("1.2.6_object_with_list_of_complex_strings");
  });
  it("should store object with list of objects of simple data types", () => {
    runBasicStoreTest(
      "1.2.7.1_object_with_list_of_objects_of_simple_data_types"
    );
  });
  it("should store object with list of list of simple data type", () => {
    runBasicStoreTest("1.2.7.2_object_with_list_of_list_of_simple_data_type");
  });
  it("should store object with two complex strings", () => {
    runBasicStoreTest("1.3.1_object_with_two_complex_strings");
  });
  it("should store object with two objects of simple data types", () => {
    runBasicStoreTest("1.3.2_object_with_two_objects_of_simple_data_types");
  });
  it("should store object with two objects of complex data types", () => {
    runBasicStoreTest("1.3.3_object_with_two_objects_of_complex_data_types");
  });
  it("should store object with two lists of simple data type", () => {
    runBasicStoreTest("1.3.4_object_with_two_lists_of_simple_data_type");
  });
  it("should store object with two lists of simple data types", () => {
    runBasicStoreTest("1.3.5_object_with_two_lists_of_simple_data_types");
  });
  it("should store object with two lists of complex strings", () => {
    runBasicStoreTest("1.3.6_object_with_two_lists_of_complex_strings");
  });
  it("should store object with two lists of objects of simple data types", () => {
    runBasicStoreTest(
      "1.3.7.1_object_with_two_lists_of_objects_of_simple_data_types"
    );
  });
  it("should store object with two lists of list of simple data type", () => {
    runBasicStoreTest(
      "1.3.7.2_object_with_two_lists_of_list_of_simple_data_type"
    );
  });
  it("should store object with empty object", () => {
    runBasicStoreTest("1.4.1_object_with_empty_object");
  });
  it("should store object with empty list", () => {
    runBasicStoreTest("1.4.2_object_with_empty_list");
  });
  it("should store list of simple data types", () => {
    runBasicStoreTest("2.1_list_of_simple_data_types");
  });
  it("should store list of complex string", () => {
    runBasicStoreTest("2.2.1_list_of_complex_string");
  });
  it("should store list of objects of simple data types", () => {
    runBasicStoreTest("2.2.2_list_of_objects_of_simple_data_types");
  });
  it("should store list of objects of complex data types", () => {
    runBasicStoreTest("2.2.3_list_of_objects_of_complex_data_types");
  });
  it("should store list of list of simple data type", () => {
    runBasicStoreTest("2.2.4_list_of_list_of_simple_data_type");
  });
  it("should store list of list of simple data types", () => {
    runBasicStoreTest("2.2.5_list_of_list_of_simple_data_types");
  });
  it("should store list of list of complex strings", () => {
    runBasicStoreTest("2.2.6_list_of_list_of_complex_strings");
  });
  it("should store list of list of objects of simple data types", () => {
    runBasicStoreTest("2.2.7.1_list_of_list_of_objects_of_simple_data_types");
  });
  it("should store list of list of of list simple data type", () => {
    runBasicStoreTest("2.2.7.2_list_of_list_of_list_of_simple_data_type");
  });
  it("should store list with empty object", () => {
    runBasicStoreTest("2.3.1_list_with_empty_object");
  });
  it("should store list with empty list", () => {
    runBasicStoreTest("2.3.2_list_with_empty_list");
  });
  it("should store legacy project", () => {
    runBasicStoreTest("3.1_legacy_project");
  });
});

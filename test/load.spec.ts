import { load } from "../src/index";
import { EMPTY_WORKINGDIR_PATH_ERROR } from "../src/load";
import { expect } from "chai";
import fs from "node:fs";
import path from "path";

function toJsonString(o: Object): string {
  return JSON.stringify(o, null, 2);
}

function runBasicLoadTest(specCaseName: string) {
  const specCasePath = path.join("test/spec", specCaseName);
  const elementPath = "model";
  const expectedModel = JSON.parse(
    fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
  );
  const result = load(specCasePath, elementPath);
  expect(result.success).to.equal(true);
  expect(result.message).to.equal(elementPath);
  expect(toJsonString(result.element)).to.equal(toJsonString(expectedModel));
}

describe("Test load function", () => {
  it("should return a LoadResult object where success is false, element is null, and message is a correct error message string, given an empty working directory path", () => {
    const result = load("", "");
    expect(result.success).to.equal(false);
    expect(result.element).to.equal(null);
    expect(result.message).to.equal(EMPTY_WORKINGDIR_PATH_ERROR); // TODO: make this correct error message string for empty directory path
  });
  it("should return a LoadResult object where success is false, element is null, and message is a correct error message string, given an empty working directory path and a non-empty element path", () => {
    const result = load("", "model");
    expect(result.success).to.equal(false);
    expect(result.element).to.equal(null);
    expect(result.message).to.equal(EMPTY_WORKINGDIR_PATH_ERROR); // TODO: make this correct error message string for empty directory path
  });
  it("should load object with simple data types", () => {
    runBasicLoadTest("1.1_object_with_simple_data_types");
  });
  it("should load object with complex string", () => {
    runBasicLoadTest("1.2.1_object_with_complex_string");
  });
  it("should load object with object of simple data types", () => {
    runBasicLoadTest("1.2.2_object_with_object_of_simple_data_types");
  });
  it("should load object with object of complex data types", () => {
    runBasicLoadTest("1.2.3_object_with_object_of_complex_data_types");
  });
  it("should load object with list of simple data type", () => {
    runBasicLoadTest("1.2.4_object_with_list_of_simple_data_type");
  });
  it("should load object with list of simple data types", () => {
    runBasicLoadTest("1.2.5_object_with_list_of_simple_data_types");
  });
  it("should load object with list of complex strings", () => {
    runBasicLoadTest("1.2.6_object_with_list_of_complex_strings");
  });
  it("should load object with list of objects of simple data types", () => {
    runBasicLoadTest(
      "1.2.7.1_object_with_list_of_objects_of_simple_data_types"
    );
  });
  it("should load object with list of list of simple data type", () => {
    runBasicLoadTest("1.2.7.2_object_with_list_of_list_of_simple_data_type");
  });
  it("should load object with two complex strings", () => {
    runBasicLoadTest("1.3.1_object_with_two_complex_strings");
  });
  it("should load object with two objects of simple data types", () => {
    runBasicLoadTest("1.3.2_object_with_two_objects_of_simple_data_types");
  });
  it("should load object with two objects of complex data types", () => {
    runBasicLoadTest("1.3.3_object_with_two_objects_of_complex_data_types");
  });
  it("should load object with two lists of simple data type", () => {
    runBasicLoadTest("1.3.4_object_with_two_lists_of_simple_data_type");
  });
  it("should load object with two lists of simple data types", () => {
    runBasicLoadTest("1.3.5_object_with_two_lists_of_simple_data_types");
  });
  it("should load object with two lists of complex strings", () => {
    runBasicLoadTest("1.3.6_object_with_two_lists_of_complex_strings");
  });
  it("should load object with two lists of objects of simple data types", () => {
    runBasicLoadTest(
      "1.3.7.1_object_with_two_lists_of_objects_of_simple_data_types"
    );
  });
  it("should load object with two lists of list of simple data type", () => {
    runBasicLoadTest(
      "1.3.7.2_object_with_two_lists_of_list_of_simple_data_type"
    );
  });
  it("should load object with empty object", () => {
    runBasicLoadTest("1.4.1_object_with_empty_object");
  });
  it("should load object with empty list", () => {
    runBasicLoadTest("1.4.2_object_with_empty_list");
  });
  it("should load legacy project", () => {
    runBasicLoadTest("3.1_legacy_project");
  });
});

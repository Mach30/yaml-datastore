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

// TODO test invalid working directory path
// TODO test invalid element path
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
  it("should load list of simple data types", () => {
    runBasicLoadTest("2.1_list_of_simple_data_types");
  });
  it("should load list of complex string", () => {
    runBasicLoadTest("2.2.1_list_of_complex_string");
  });
  it("should load list of objects of simple data types", () => {
    runBasicLoadTest("2.2.2_list_of_objects_of_simple_data_types");
  });
  it("should load list of objects of complex data types", () => {
    runBasicLoadTest("2.2.3_list_of_objects_of_complex_data_types");
  });
  it("should load list of list of simple data type", () => {
    runBasicLoadTest("2.2.4_list_of_list_of_simple_data_type");
  });
  it("should load list of list of simple data types", () => {
    runBasicLoadTest("2.2.5_list_of_list_of_simple_data_types");
  });
  it("should load list of list of complex strings", () => {
    runBasicLoadTest("2.2.6_list_of_list_of_complex_strings");
  });
  it("should load list of list of objects of simple data types", () => {
    runBasicLoadTest("2.2.7.1_list_of_list_of_objects_of_simple_data_types");
  });
  it("should load list of list of of list simple data type", () => {
    runBasicLoadTest("2.2.7.2_list_of_list_of_list_of_simple_data_type");
  });
  it("should load list with empty object", () => {
    runBasicLoadTest("2.3.1_list_with_empty_object");
  });
  it("should load list with empty list", () => {
    runBasicLoadTest("2.3.2_list_with_empty_list");
  });
  it("should load object of simple data types via dot-separated element path", () => {
    const specCasePath = path.join(
      "test/spec",
      "1.2.2_object_with_object_of_simple_data_types"
    );
    const elementPath = "model.address";
    const expectedModel = JSON.parse(
      fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
    )["address"];
    const result = load(specCasePath, elementPath);
    expect(result.success).to.equal(true);
    expect(result.message).to.equal(elementPath);
    expect(toJsonString(result.element)).to.equal(toJsonString(expectedModel));
  });
  it("should load object of complex data types via dot-separated element path", () => {
    const specCasePath = path.join(
      "test/spec",
      "1.2.3_object_with_object_of_complex_data_types"
    );
    const elementPath = "model.myObj";
    const expectedModel = JSON.parse(
      fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
    )["myObj"];
    const result = load(specCasePath, elementPath);
    expect(result.success).to.equal(true);
    expect(result.message).to.equal(elementPath);
    expect(toJsonString(result.element)).to.equal(toJsonString(expectedModel));
  });
  it("should load list of simple data types via dot-separated element path", () => {
    const specCasePath = path.join(
      "test/spec",
      "1.2.5_object_with_list_of_simple_data_types"
    );
    const elementPath = "model.personInfo";
    const expectedModel = JSON.parse(
      fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
    )["personInfo"];
    const result = load(specCasePath, elementPath);
    expect(result.success).to.equal(true);
    expect(result.message).to.equal(elementPath);
    expect(toJsonString(result.element)).to.equal(toJsonString(expectedModel));
  });
  it("should load list of complex strings via dot-separated element path", () => {
    const specCasePath = path.join(
      "test/spec",
      "1.3.6_object_with_two_lists_of_complex_strings"
    );
    const elementPath = "model.firstTwoVerses_txt";
    const expectedModel = JSON.parse(
      fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
    )["firstTwoVerses_txt"];
    const result = load(specCasePath, elementPath);
    expect(result.success).to.equal(true);
    expect(result.message).to.equal(elementPath);
    expect(toJsonString(result.element)).to.equal(toJsonString(expectedModel));
  });
  it("should load complex string (from text document with extension) via dot-separated element path", () => {
    const specCasePath = path.join(
      "test/spec",
      "1.2.1_object_with_complex_string"
    );
    const elementPath = "model.lyrics_txt";
    const expectedModel = JSON.parse(
      fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
    )["lyrics_txt"];
    const result = load(specCasePath, elementPath);
    expect(result.success).to.equal(true);
    expect(result.message).to.equal(elementPath);
    expect(toJsonString(result.element)).to.equal(toJsonString(expectedModel));
  });
  it("should load complex string (from text document without extensino) via dot-separated element path", () => {
    const specCasePath = path.join(
      "test/spec",
      "1.3.1_object_with_two_complex_strings"
    );
    const elementPath = "model.verse1";
    const expectedModel = JSON.parse(
      fs.readFileSync(path.resolve(specCasePath, "model.json"), "utf8")
    )["verse1"];
    const result = load(specCasePath, elementPath);
    expect(result.success).to.equal(true);
    expect(result.message).to.equal(elementPath);
    expect(toJsonString(result.element)).to.equal(toJsonString(expectedModel));
  });
  it("should load legacy project", () => {
    runBasicLoadTest("3.1_legacy_project");
  });
});

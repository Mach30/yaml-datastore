import { clear } from "../src/index";
import { getElementPathInfo } from "../src/load";
import { toJsonString, toSpecCasePath } from "./load.spec";
import { StoreTestResult } from "./store.spec";
import { expect } from "chai";
import fs from "node:fs";
import path from "path";
import { hashElement } from "folder-hash";

const TMP_WORKING_DIR_PATH = "/tmp/my-project";
let workingDir = "";

// options for files/folders to ignore for hashElement
const options = {
  files: { exclude: ["*.json"] },
};

/**
 *
 * @param specCaseName folder name of spec to test
 * @param elementPath element path to element to be cleared from working directory of spec case
 * @param expectedParentElementPath element path to expected parent element after clear operation
 * @returns StoreTestResult where specCasePath is path to expected parent element after clear operation and storePath is path to parent element contained cleared element
 */
function runBasicClearTest(
  specCaseName: string,
  elementPath: string,
  expectedParentElementPath: string
) {
  // 1. select spec case
  const specCasePath = toSpecCasePath(specCaseName);

  // 2. copy spec case files into TMP_WORKING_DIR_PATH
  fs.cpSync(specCasePath, TMP_WORKING_DIR_PATH, { recursive: true });

  // 3. clear element, given working directory path and element path
  const result = clear(TMP_WORKING_DIR_PATH, elementPath);

  const pathToExpectedParentElement = getElementPathInfo(
    specCasePath,
    expectedParentElementPath
  ).data;
  const expectedParentElement = JSON.parse(
    fs.readFileSync(
      path.resolve(specCasePath, expectedParentElementPath + ".json"),
      "utf-8"
    )
  );

  // 4. verify results of clear operation
  expect(result.success).to.equal(true);
  expect(toJsonString(result.element)).to.equal(
    toJsonString(expectedParentElement)
  );

  const pathToExpectedParentElementDirectory = path.parse(
    pathToExpectedParentElement
  ).dir;
  const pathToResultParentElementDirectory = path.parse(
    getElementPathInfo(TMP_WORKING_DIR_PATH, result.message).data
  ).dir;

  // 5. return test results
  return new StoreTestResult(
    pathToExpectedParentElementDirectory,
    pathToResultParentElementDirectory
  );
}

describe("Test basic clear function", () => {
  beforeEach(function () {
    workingDir = TMP_WORKING_DIR_PATH;
    fs.mkdirSync(workingDir);
  });
  afterEach(function () {
    fs.rmSync(TMP_WORKING_DIR_PATH, { recursive: true, force: true });
  });
  it("should clear simple string from object", async () => {
    const result = runBasicClearTest(
      "1.1_object_with_simple_data_types",
      "model.name",
      "modelClearName"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should clear other simple data types from object", async () => {
    const elementPaths = [
      "model.age",
      "model.attending",
      "model.plusOne",
      "model.degrees",
      "model.aliases",
      "model.notes",
    ];

    for (const elementPath of elementPaths) {
      const elementPathAsSplitString = elementPath.split(".");
      const expectedParentElementPath =
        elementPathAsSplitString[0] +
        "Clear" +
        elementPathAsSplitString[1].charAt(0).toUpperCase() +
        elementPathAsSplitString[1].slice(1);
      const result = runBasicClearTest(
        "1.1_object_with_simple_data_types",
        elementPath,
        expectedParentElementPath
      );

      const specCasePathHash = await hashElement(result.specCasePath, options);
      const storePathHash = await hashElement(result.storePath, options);

      // verify that checksums of on-disk representation from spec case versus serialized content are identical
      expect(toJsonString(storePathHash["children"])).to.equal(
        toJsonString(specCasePathHash["children"])
      );
    }
  });
  it("should clear complex string from object", async () => {
    const result = runBasicClearTest(
      "1.2.1_object_with_complex_string",
      "model.lyrics_txt",
      "modelClearLyrics_txt"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should clear object of simple data types from object", async () => {
    const result = runBasicClearTest(
      "1.2.2_object_with_object_of_simple_data_types",
      "model.address",
      "modelClearAddress"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should clear list of complex strings from object", async () => {
    const result = runBasicClearTest(
      "1.2.6_object_with_list_of_complex_strings",
      "model.verses_txt",
      "modelClearVerses_txt"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should clear list of object of simple data types from object", async () => {
    const result = runBasicClearTest(
      "1.3.7.1_object_with_two_lists_of_objects_of_simple_data_types",
      "model.ncc1701dCommanders",
      "modelClearNcc1701dCommanders"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should clear list of list of simple data type from object", async () => {
    const result = runBasicClearTest(
      "1.3.7.2_object_with_two_lists_of_list_of_simple_data_type",
      "model.second4Primes",
      "modelClearSecond4Primes"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
});

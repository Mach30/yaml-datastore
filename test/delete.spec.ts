import { deleteElement } from "../src/index";
import { convertElementPathToFilePath } from "../src/load";
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
 * @param elementPath element path to element to be deleted from working directory of spec case
 * @param expectedParentElementPath element path to expected parent element after delete operation
 * @returns StoreTestResult where specCasePath is path to expected parent element after delete operation and storePath is path to parent element contained deleted element
 */
function runBasicDeleteTest(
  specCaseName: string,
  elementPath: string,
  expectedParentElementPath: string
) {
  // 1. select spec case
  const specCasePath = toSpecCasePath(specCaseName);

  // 2. copy spec case files into TMP_WORKING_DIR_PATH
  fs.cpSync(specCasePath, TMP_WORKING_DIR_PATH, { recursive: true });

  // 3. delete element, given working directory path and element path
  const result = deleteElement(TMP_WORKING_DIR_PATH, elementPath);

  const pathToExpectedParentElement = convertElementPathToFilePath(
    specCasePath,
    expectedParentElementPath
  ).data;
  const expectedParentElement = JSON.parse(
    fs.readFileSync(
      path.resolve(specCasePath, expectedParentElementPath + ".json"),
      "utf-8"
    )
  );

  // 4. verify results of deleteElement operation
  expect(result.success).to.equal(true);
  expect(toJsonString(result.element)).to.equal(
    toJsonString(expectedParentElement)
  );

  const pathToExpectedParentElementDirectory = path.parse(
    pathToExpectedParentElement
  ).dir;
  const pathToResultParentElementDirectory = path.parse(
    convertElementPathToFilePath(TMP_WORKING_DIR_PATH, result.message).data
  ).dir;

  // 5. return test results
  return new StoreTestResult(
    pathToExpectedParentElementDirectory,
    pathToResultParentElementDirectory
  );
}

describe("Test basic delete function", () => {
  beforeEach(function () {
    workingDir = TMP_WORKING_DIR_PATH;
    fs.mkdirSync(workingDir);
  });
  afterEach(function () {
    fs.rmSync(TMP_WORKING_DIR_PATH, { recursive: true, force: true });
  });
  it("should delete object of simple data types from object", async () => {
    const result = runBasicDeleteTest(
      "1.2.2_object_with_object_of_simple_data_types",
      "model.address",
      "modelDeleteAddress"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should delete list of complex strings from object", () => {
    // TODO
  });
  it("should delete complex string from object", async () => {
    const result = runBasicDeleteTest(
      "1.2.1_object_with_complex_string",
      "model.lyrics_txt",
      "modelDeleteLyrics_txt"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should delete simple string from object", async () => {
    const result = runBasicDeleteTest(
      "1.1_object_with_simple_data_types",
      "model.name",
      "modelDeleteName"
    );

    const specCasePathHash = await hashElement(result.specCasePath, options);
    const storePathHash = await hashElement(result.storePath, options);

    // verify that checksums of on-disk representation from spec case versus serialized content are identical
    expect(toJsonString(storePathHash["children"])).to.equal(
      toJsonString(specCasePathHash["children"])
    );
  });
  it("should delete other simple data types from object", async () => {
    const elementPaths = [
      "model.age",
      "model.attending",
      "model.plusOne",
      "model.degrees",
      "model.aliases",
    ];

    for (const elementPath of elementPaths) {
      const elementPathAsSplitString = elementPath.split(".");
      const expectedParentElementPath =
        elementPathAsSplitString[0] +
        "Delete" +
        elementPathAsSplitString[1].charAt(0).toUpperCase() +
        elementPathAsSplitString[1].slice(1);
      const result = runBasicDeleteTest(
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
});

import fs from "node:fs";
import yaml from "js-yaml";
import { load, YdsResult } from "./index.js";
import {
  EMPTY_WORKINGDIR_PATH_ERROR,
  INVALID_PATH_ERROR,
  ElementPathType,
  convertElementPathToFilePath,
} from "./load.js";
import { getParentElementInfo } from "./delete.js";

export function clear(
  workingDirectoryPath: string,
  elementPath: string
): YdsResult {
  if (workingDirectoryPath === "") {
    return new YdsResult(false, null, EMPTY_WORKINGDIR_PATH_ERROR);
  } else {
    const parentElementInfo = getParentElementInfo(
      workingDirectoryPath,
      elementPath
    );
    const parentElementPath = parentElementInfo.parentElementPath;
    const elementPathObj = convertElementPathToFilePath(
      workingDirectoryPath,
      elementPath
    );
    const parentElementFilePath = parentElementInfo.parentElementFilePath;
    let parentElement = load(workingDirectoryPath, parentElementPath).element;
    switch (elementPathObj.type) {
      case ElementPathType.empty:
      case ElementPathType.simpleToObject:
      case ElementPathType.complexToObject:
        //TODO
        break;
      case ElementPathType.simpleToList:
      case ElementPathType.complexToList:
        //TODO
        break;
      case ElementPathType.simpleToSimple:
      case ElementPathType.complexToSimple:
        if (
          parentElement[parentElementInfo.indexOfChild] === null ||
          parentElement[parentElementInfo.indexOfChild] === "" ||
          typeof parentElement[parentElementInfo.indexOfChild] === "object"
        ) {
          return new YdsResult(true, parentElement, parentElementPath);
        } else if (
          typeof parentElement[parentElementInfo.indexOfChild] === "string"
        ) {
          parentElement[parentElementInfo.indexOfChild] = "";
          fs.writeFileSync(parentElementFilePath, yaml.dump(parentElement));
          return new YdsResult(true, parentElement, parentElementPath);
        } else if (
          typeof parentElement[parentElementInfo.indexOfChild] === "number" ||
          typeof parentElement[parentElementInfo.indexOfChild] === "boolean"
        ) {
          parentElement[parentElementInfo.indexOfChild] = null;
          fs.writeFileSync(parentElementFilePath, yaml.dump(parentElement));
          return new YdsResult(true, parentElement, parentElementPath);
        }
      case ElementPathType.simpleToComplexString:
      case ElementPathType.complexToComplexString:
        fs.rmSync(elementPathObj.data);
        parentElement[parentElementInfo.indexOfChild] = "";
        fs.writeFileSync(parentElementFilePath, yaml.dump(parentElement));
        return new YdsResult(true, parentElement, parentElementPath);
      case ElementPathType.invalid:
        break;
    }
    return new YdsResult(
      false,
      null,
      INVALID_PATH_ERROR +
        " [" +
        workingDirectoryPath +
        " | " +
        elementPath +
        "]"
    );
  }
}

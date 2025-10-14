import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";
import { load, YdsResult } from "./index.js";
import {
  EMPTY_WORKINGDIR_PATH_ERROR,
  INVALID_PATH_ERROR,
  ElementPathType,
  convertElementPathToFilePath,
} from "./load.js";

class ParentElementInfo {
  private _parentElementPath: string;
  private _parentElementFilePath: string;
  private _indexOfChild: any;

  constructor(
    parentElementPath: string,
    parentElementFilePath: string,
    indexOfChild: any
  ) {
    this._parentElementPath = parentElementPath;
    this._parentElementFilePath = parentElementFilePath;
    this._indexOfChild = indexOfChild;
  }

  public get parentElementPath() {
    return this._parentElementPath;
  }

  public get parentElementFilePath() {
    return this._parentElementFilePath;
  }

  public get indexOfChild() {
    return this._indexOfChild;
  }
}

function getParentElementInfo(
  workingDirectoryPath: string,
  elementPath: string
): ParentElementInfo {
  let parentElementPath = elementPath;
  let indexOfChild = null;
  if (elementPath.slice(-1) === "]") {
    parentElementPath = elementPath.slice(0, elementPath.lastIndexOf("["));
    indexOfChild = elementPath.slice(elementPath.lastIndexOf("[") + 1, -1);
  } else if (elementPath.includes(".")) {
    parentElementPath = elementPath.slice(0, elementPath.lastIndexOf("."));
    indexOfChild = elementPath.slice(elementPath.lastIndexOf(".") + 1);
  }
  const parentElementFilePath = convertElementPathToFilePath(
    workingDirectoryPath,
    parentElementPath
  ).data;
  return new ParentElementInfo(
    parentElementPath,
    parentElementFilePath,
    indexOfChild
  );
}

export function deleteElement(
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
    switch (elementPathObj.type) {
      case ElementPathType.empty:
      case ElementPathType.simpleToObject:
      case ElementPathType.simpleToList:
      case ElementPathType.complexToObject:
      case ElementPathType.complexToList:
        // TODO
        break;
      case ElementPathType.simpleToSimple:
      case ElementPathType.complexToSimple:
        // TODO
        const parentElementFilePath = parentElementInfo.parentElementFilePath;
        let parentElement = load(
          workingDirectoryPath,
          parentElementPath,
          0
        ).element;
        delete parentElement[parentElementInfo.indexOfChild];
        fs.writeFileSync(parentElementFilePath, yaml.dump(parentElement));
        return new YdsResult(true, parentElement, parentElementPath);
      case ElementPathType.simpleToComplexString:
      case ElementPathType.complexToComplexString:
        // TODO
        break;
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

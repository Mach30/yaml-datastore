import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";

export const EMPTY_WORKINGDIR_PATH_ERROR =
  "Error: Cannot load from empty working directory path";

// Regular Expression used for matching element file paths enclosed between double parentheses
const regex = /\(\(.*\)\)/;
const re = new RegExp(regex);

/**
 * Represents results of a call to the load function
 */
export class LoadResult {
  private _success: boolean;
  private _element: any;
  private _message: string;

  /**
   * Default constructor for LoadResult
   *
   * @param success success status of load() operation
   * @param element element read into memory by load() operation
   * @param message message describing success status of load() operation
   * @returns new LoadResult object
   */
  constructor(success: boolean, element: any, message: string) {
    this._success = success;
    if (this._success) {
      this._element = element;
    } else {
      this._element = null;
    }
    this._message = message;
  }
  /** @returns success status. */
  public get success() {
    return this._success;
  }
  /** @returns element read into memory on success or null on failure. */
  public get element() {
    return this._element;
  }
  /** @returns element path on success or an explanation of the failure. */
  public get message() {
    return this._message;
  }
}

// local function used for parsing strings enclosed between double parentheses
function trimDoubleParentheses(aString: string): string {
  return aString.slice(2, -2);
}

// local function used for converting elementFilePath to elementPath
function toElementPath(elementFilePath: string): string {
  if (elementFilePath.slice(-10) === "_this.yaml") {
    // handle case where elementFilePath is a YAML object
    const elementPath = elementFilePath.split("/").slice(0, -1).join(".");
    return elementPath;
  } else if (elementFilePath.slice(-5) === ".yaml") {
    // handle case where elementFilePath is a YAML list
    const elementPath = elementFilePath.slice(0, -5).replace("/", ".");
    return elementPath;
  } else {
    return elementFilePath.replace(".", "_");
  }
}

// local function used for loading _this.yaml
function loadThisYaml(
  fullElementFilePath: string,
  elementPath: string
): LoadResult {
  const thisYamlContent = fs.readFileSync(fullElementFilePath, "utf8");
  const thisYaml = yaml.load(thisYamlContent);
  // iterate through elements of thisYaml and replace ((filepath)) with its loaded complex data type
  Object.entries(thisYaml as any).forEach(([key, value]) => {
    if (typeof value == "string") {
      if (re.test(value.toString())) {
        // parse filepath from ((filepath))
        const fullElementDirPath = fullElementFilePath.slice(0, -10);
        const aComplexDataTypeFilePath = trimDoubleParentheses(value);
        const newElementPath = toElementPath(aComplexDataTypeFilePath);
        (thisYaml as any)[key] = load(
          fullElementDirPath,
          newElementPath
        ).element;
      }
    }
  });
  return new LoadResult(true, thisYaml, elementPath);
}

// local function used for loading a YAML list
function loadYamlList(
  fullElementFilePath: string,
  elementPath: string
): LoadResult {
  const aYamlListContent = fs.readFileSync(fullElementFilePath, "utf-8");
  let aYamlListAsJsObject = yaml.load(aYamlListContent);
  // iterate through elements of list and replace ((filepath)) with its loaded complex data type
  for (let i = 0; i < (aYamlListAsJsObject as any).length; i++) {
    if (typeof (aYamlListAsJsObject as any)[i] == "string") {
      if (re.test((aYamlListAsJsObject as any)[i].toString())) {
        // parse filepath from ((filepath))
        const fullElementDirPath = fullElementFilePath
          .split("/")
          .slice(0, -1)
          .join("/");
        const aComplexDataTypeFilePath = trimDoubleParentheses(
          (aYamlListAsJsObject as any)[i]
        );
        const newElementPath = toElementPath(aComplexDataTypeFilePath);
        (aYamlListAsJsObject as any)[i] = load(
          fullElementDirPath,
          newElementPath
        ).element;
      }
    }
  }
  return new LoadResult(true, aYamlListAsJsObject, elementPath);
}

// local function used for extracting relative filepath from workingDirectoryPath and elementPath
function toFullElementFilePath(
  workingDirectoryPath: string,
  elementPath: string
): string {
  // split elementPath delimitted by "." into array
  const elementPathAsArray = elementPath.split(".");
  // handle case where element filename has underscores for returning file paths with extensions
  const elementDirPath = elementPathAsArray.slice(0, -1).join("/");
  const elementSplitName = elementPathAsArray.slice(-1)[0].split("_");
  let thisYamlFullFilePath = "";
  let aYamlListFullFilePath = "";
  let aTextDocFullFilePath = "";
  let elementName = "";
  if (elementSplitName.length > 1) {
    // handle case where element is a YAML object
    elementName = elementSplitName.join("_");
    thisYamlFullFilePath = path.join(
      workingDirectoryPath,
      elementDirPath,
      elementName,
      "_this.yaml"
    );

    // handle case where element is a YAML list
    aYamlListFullFilePath = path.join(
      workingDirectoryPath,
      elementDirPath,
      [elementName, "yaml"].join(".")
    );
    // handle case where element is a text document
    elementName = elementSplitName.slice(0, -1).join("_");
    let elementExt = elementSplitName.slice(-1)[0];
    aTextDocFullFilePath = path.join(
      workingDirectoryPath,
      elementDirPath,
      [elementName, elementExt].join(".")
    );
  } else {
    // handle case where element filename doesn't have underscores
    elementName = elementSplitName.join("");

    // handle case where element is a YAML object
    thisYamlFullFilePath = path.join(
      workingDirectoryPath,
      elementDirPath,
      elementName,
      "_this.yaml"
    );

    // handle case where element is a YAML list
    aYamlListFullFilePath = path.join(
      workingDirectoryPath,
      elementDirPath,
      [elementName, "yaml"].join(".")
    );

    // handle case where element is a text document
    aTextDocFullFilePath = path.join(
      workingDirectoryPath,
      elementDirPath,
      elementName
    );
  }

  if (fs.existsSync(thisYamlFullFilePath)) {
    return thisYamlFullFilePath;
  } else if (fs.existsSync(aYamlListFullFilePath)) {
    return aYamlListFullFilePath;
  } else {
    return aTextDocFullFilePath;
  }
}

/**
 * Returns a in-memory representation of the element in working directory specified by element path
 *
 * @param workingDirectoryPath relative or absolute path to working directory containing yaml-datastore serialized content
 * @param elementPath object path (dot separated, with support for bracketed indexing for list elements or key-value pairs in objects) from working directory to element to be read into memory (e.g., top-element.sub-element.property[3])
 * @param depth integer from -1 to depth of element indicating how deep into element's hierachy to read into memory (-1 = read full depth. Defaults to -1)
 * @returns a LoadResult containing the status and content of the load function
 */
export function load(
  workingDirectoryPath: string,
  elementPath: string,
  depth: number = -1
): LoadResult {
  if (workingDirectoryPath === "") {
    return new LoadResult(false, null, EMPTY_WORKINGDIR_PATH_ERROR);
  } else {
    // extract relative file path, given working directory path and element path
    const fullElementFilePath = toFullElementFilePath(
      workingDirectoryPath,
      elementPath
    );

    let elementContent = fs.readFileSync(fullElementFilePath, "utf8");

    if (fullElementFilePath.slice(-10) === "_this.yaml") {
      // handle case where element content is YAML object
      return loadThisYaml(fullElementFilePath, elementPath);
    } else if (fullElementFilePath.slice(-5) === ".yaml") {
      // handle case where element content is a YAML list
      const aYamlList = yaml.load(elementContent);
      return loadYamlList(fullElementFilePath, elementPath);
    } else {
      // handle case where element content is a text document
      return new LoadResult(true, elementContent, elementPath);
    }
  }
}

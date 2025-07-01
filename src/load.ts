import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";

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

// local function used for loading _this.yaml
function loadThisYaml(
  workingDirectoryPath: string,
  elementFilePath: string,
  elementPath: string
): LoadResult {
  const fullElementFilePath = path.join(workingDirectoryPath, elementFilePath);
  const thisYamlContent = fs.readFileSync(fullElementFilePath, "utf8");
  const thisYaml = yaml.load(thisYamlContent);
  // iterate through elements of thisYaml and replace ((filepath)) with its associated complex data type
  Object.entries(thisYaml as any).forEach(([key, value]) => {
    const regex = /\(\(.*\)\)/;
    const re = new RegExp(regex);
    if (typeof value == "string") {
      if (re.test(value.toString())) {
        // parse filepath from ((filepath))
        const aComplexDataTypeFilePath = trimDoubleParentheses(value);
        const fullElementFilePath = path.join(
          workingDirectoryPath,
          elementFilePath.slice(0, -10),
          aComplexDataTypeFilePath
        );
        const newWorkingDirectoryPath = fullElementFilePath
          .split("/")
          .slice(0, -2)
          .join("/");
        let newElementPath = "";
        if (fullElementFilePath.includes("_this.yaml")) {
          newElementPath = fullElementFilePath
            .split("/")
            .slice(-2, -1)
            .join(".");
        } else {
          const fullElementFilePathAsArray = fullElementFilePath
            .split("/")
            .slice(-2, -1);
          const elementName = fullElementFilePath
            .split("/")
            .slice(-1)[0]
            .replace(".yaml", "")
            .replace(".", "_");
          fullElementFilePathAsArray.push(elementName);
          (newElementPath as any) = fullElementFilePathAsArray.join(".");
        }
        (thisYaml as any)[key] = load(
          newWorkingDirectoryPath,
          newElementPath
        ).element;
      }
    }
  });
  return new LoadResult(true, thisYaml, elementPath);
}

// local function used for extracting relative filepath from workingDirectoryPath and elementPath
function toElementFilePath(
  workingDirectoryPath: string,
  elementPath: string
): string {
  // split elementPath delimitted by "." into array
  const elementPathAsArray = elementPath.split(".");
  if (elementPathAsArray.length > 1) {
    // handle case where element filename has underscores
    const elementDirPath = elementPathAsArray.slice(0, -1).join("/");
    const elementSplitName = elementPathAsArray.slice(-1)[0].split("_");
    const fullElementDirPath = path.join(workingDirectoryPath, elementDirPath);
    const lsFullElementDirPath = fs.readdirSync(fullElementDirPath);
    let elementName = "";
    let elementExt = "";
    let elementFilename = "";
    if (elementSplitName.length > 1) {
      // handle case where element is a YAML file
      elementName = elementSplitName.join("_");
      elementExt = "yaml";
      elementFilename = [elementName, elementExt].join(".");
      if (lsFullElementDirPath.includes(elementFilename)) {
        const elementFilePath = path.join(elementDirPath, elementFilename);
        return elementFilePath;
      }

      // handle case where element is a text document
      elementName = elementSplitName.slice(0, -1).join("_");
      elementExt = elementSplitName.slice(-1)[0];
      elementFilename = [elementName, elementExt].join(".");
      if (lsFullElementDirPath.includes(elementFilename)) {
        const elementFilePath = path.join(elementDirPath, elementFilename);
        return elementFilePath;
      }
    } else {
      // handle case where element filename doesn't have underscores
      elementName = elementSplitName.join("");

      // handle case where element is a YAML file
      elementExt = "yaml";
      elementFilename = [elementName, elementExt].join(".");
      if (lsFullElementDirPath.includes(elementFilename)) {
        const elementFilePath = path.join(elementDirPath, elementFilename);
        return elementFilePath;
      }

      // handle case where element is a text document
      elementFilename = elementName;
      if (lsFullElementDirPath.includes(elementFilename)) {
        const elementFilePath = path.join(elementDirPath, elementFilename);
        return elementFilePath;
      }
    }
  }
  const elementDirPath = elementPath;
  const fullElementDirPath = path.join(workingDirectoryPath, elementDirPath);
  const lsFullElementDirPath = fs.readdirSync(fullElementDirPath);
  // handle case where element is an object
  if (lsFullElementDirPath.includes("_this.yaml")) {
    const elementFilePath = path.join(elementDirPath, "_this.yaml");
    return elementFilePath;
  }
  return "";
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
  if (workingDirectoryPath != "" && depth == -1) {
    // extract relative file path, given working directory path and element path
    const elementFilePath = toElementFilePath(
      workingDirectoryPath,
      elementPath
    );
    const fullElementFilePath = path.join(
      workingDirectoryPath,
      elementFilePath
    );
    let elementContent = "";

    (elementContent as any) = fs.readFileSync(fullElementFilePath, "utf8");
    if (elementFilePath.slice(-10) == "_this.yaml") {
      // handle case where element content is YAML object
      return loadThisYaml(workingDirectoryPath, elementFilePath, elementPath);
    } else if (elementFilePath.slice(-5) == ".yaml") {
      // handle case where element content is a YAML list
      const aYamlList = yaml.load(elementContent);
      return new LoadResult(true, aYamlList, elementPath);
    }
    // handle case where element content is a text document
    return new LoadResult(true, elementContent, elementPath);
  }
  return new LoadResult(false, null, "");
}

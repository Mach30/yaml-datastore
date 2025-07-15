import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";

export const EMPTY_WORKINGDIR_PATH_ERROR =
  "Error: Cannot load from empty working directory path";
export const INVALID_PATH_ERROR =
  "Error: Invalid path to element on filesystem";

// Regular expression used for matching element file paths enclosed between double parentheses
const doubleParenthesesRegEx = new RegExp(/\(\(.*\)\)/);

// Regular expression used for matching 6-character uppercase alphanumeric string
const idRegex = new RegExp(/^[A-Z0-9]{6}$/);

// TODO: need to typedoc elementPathType
enum ElementPathType {
  invalid, // element is null
  empty, // filepath points to an object to be loaded
  simpleToObject, // filepath points to an object to be loaded
  simpleToList, // filepath points to a list to be loaded
  simpleToComplexString, // filepath points to a complex string to be loaded
  simpleToSimple, // element is already in memory to be accessed
  complexToComplex, // filepath points to a complex type (i.e., object, list, complex string) to be loaded
  complexToSimple, // element is already in memory to be accessed
}

class ElementPathResult {
  private _type: ElementPathType;
  private _data: any;

  /**
   * Default constructor for ElementPathResult
   *
   * @param type elementPath type
   * @param data filepath to be read into memory, or simple element, or null (for invalid path)
   */
  constructor(type: ElementPathType, data: any) {
    this._type = type;
    if (this._type === ElementPathType.invalid) {
      this._data = null;
    } else {
      this._data = data;
    }
  }

  /** @returns elementPath type */
  public get type() {
    return this._type;
  }

  /** @returns filepath to be read into memory, or simple element, or null (for invalid path) */
  public get data() {
    return this._data;
  }
}

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

// local function used for converting filePath to elementPath
function convertYamlFilePathToElementPath(filePath: string): string {
  if (filePath.slice(-10) === "_this.yaml") {
    // handle case where filePath is a YAML object
    const elementPath = filePath.split("/").slice(0, -1).join(".");
    return elementPath;
  } else if (filePath.slice(-5) === ".yaml") {
    // handle case where filePath is a YAML list
    const elementPath = filePath.slice(0, -5).replace("/", ".");
    return elementPath;
  } else {
    // handle case where filePath is a text document
    return filePath.replace(".", "_");
  }
}

// local function used for loading _this.yaml
function loadThisYaml(filePath: string, elementPath: string): LoadResult {
  const thisYamlContent = fs.readFileSync(filePath, "utf8");
  const thisYaml = yaml.load(thisYamlContent);
  // iterate through elements of thisYaml and replace ((filepath)) with its loaded complex data type
  Object.entries(thisYaml as any).forEach(([key, value]) => {
    if (typeof value == "string") {
      if (doubleParenthesesRegEx.test(value)) {
        // parse filepath from ((filepath))
        const dirPath = filePath.slice(0, -10);
        const aComplexDataTypeFilePath = trimDoubleParentheses(value);
        const newElementPath = convertYamlFilePathToElementPath(
          aComplexDataTypeFilePath
        );
        (thisYaml as any)[key] = load(dirPath, newElementPath).element;
      }
    }
  });
  return new LoadResult(true, thisYaml, elementPath);
}

// local function used for loading a YAML list
function loadYamlList(filePath: string, elementPath: string): LoadResult {
  const aYamlListContent = fs.readFileSync(filePath, "utf-8");
  let aYamlListAsJsObject = yaml.load(aYamlListContent);
  // iterate through elements of list and replace ((filepath)) with its loaded complex data type
  for (let i = 0; i < (aYamlListAsJsObject as any).length; i++) {
    if (typeof (aYamlListAsJsObject as any)[i] == "string") {
      if (doubleParenthesesRegEx.test((aYamlListAsJsObject as any)[i])) {
        // parse filepath from ((filepath))
        const dirPath = filePath.split("/").slice(0, -1).join("/");
        const aComplexDataTypeFilePath = trimDoubleParentheses(
          (aYamlListAsJsObject as any)[i]
        );
        if (aComplexDataTypeFilePath.slice(-5) === ".yaml") {
          const newElementPath = convertYamlFilePathToElementPath(
            aComplexDataTypeFilePath
          );
          (aYamlListAsJsObject as any)[i] = load(
            dirPath,
            newElementPath
          ).element;
        } else {
          const newFilePathToLoad = path.join(
            dirPath,
            aComplexDataTypeFilePath
          );
          const aComplexDataTypeContent = fs.readFileSync(
            newFilePathToLoad,
            "utf-8"
          );
          (aYamlListAsJsObject as any)[i] = aComplexDataTypeContent;
        }
      }
    }
  }
  return new LoadResult(true, aYamlListAsJsObject, elementPath);
}

function convertElementPathToFilePath(
  workingDirectoryPath: string,
  elementPath: string
): ElementPathResult {
  if (elementPath === "") {
    // case empty
    let filepath = path.join(workingDirectoryPath, "_this.yaml");
    if (fs.existsSync(filepath)) {
      return new ElementPathResult(ElementPathType.empty, filepath);
    }
  } else if (
    !elementPath.includes(".") &&
    !elementPath.includes("[") &&
    !elementPath.includes("]")
  ) {
    // simple path case
    let filePath = path.join(workingDirectoryPath, elementPath, "_this.yaml");
    if (fs.existsSync(filePath)) {
      // object path case
      return new ElementPathResult(ElementPathType.simpleToObject, filePath);
    }

    //
    filePath = path.join(workingDirectoryPath, elementPath + ".yaml");
    if (fs.existsSync(filePath)) {
      // list path case
      return new ElementPathResult(ElementPathType.simpleToList, filePath);
    }

    filePath = path.join(workingDirectoryPath, "_this.yaml");
    if (fs.existsSync(filePath)) {
      // complex type path or property case
      const thisYamlContent = fs.readFileSync(filePath, "utf-8");
      const thisYaml = yaml.load(thisYamlContent);
      const rawData = (thisYaml as any)[elementPath];
      if (typeof rawData === "string") {
        if (doubleParenthesesRegEx.test(rawData)) {
          // complex string path case
          filePath = path.join(
            workingDirectoryPath,
            trimDoubleParentheses(rawData)
          );
          if (fs.existsSync(filePath)) {
            return new ElementPathResult(
              ElementPathType.simpleToComplexString,
              filePath
            );
          }
        }
      }
      return new ElementPathResult(ElementPathType.simpleToSimple, rawData);
    } else {
      // invalid case
      return new ElementPathResult(ElementPathType.invalid, null);
    }
  } else {
    // complex path case
  }

  return new ElementPathResult(ElementPathType.invalid, null);
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
    let elementPathObj = convertElementPathToFilePath(
      workingDirectoryPath,
      elementPath
    );
    switch (elementPathObj.type) {
      case ElementPathType.empty:
      case ElementPathType.simpleToObject:
        return loadThisYaml(elementPathObj.data, elementPath);
      case ElementPathType.simpleToSimple:
        return new LoadResult(true, elementPathObj.data, elementPath);
      case ElementPathType.simpleToList:
        return loadYamlList(elementPathObj.data, elementPath);
      case ElementPathType.simpleToComplexString:
        const elementContent = fs.readFileSync(elementPathObj.data, "utf-8");
        return new LoadResult(true, elementContent, elementPath);
      case ElementPathType.complexToSimple:
        break;
      case ElementPathType.complexToComplex:
        break;
      case ElementPathType.invalid:
        break;
    }
    return new LoadResult(
      false,
      null,
      INVALID_PATH_ERROR +
        " [" +
        workingDirectoryPath +
        " | " +
        elementPath +
        "]"
    ); // // extract relative file path, given working directory path and element path
    // let filePath = tofilePath(
    //   workingDirectoryPath,
    //   elementPath
    // );

    // let elementContent = "";

    // if (fs.existsSync(filePath)) {
    //   elementContent = fs.readFileSync(filePath, "utf8");
    // } else {
    //   filePath = filePath.replace(
    //     elementPath,
    //     "_this.yaml"
    //   );
    //   if (fs.existsSync(filePath)) {
    //     elementContent = fs.readFileSync(filePath, "utf-8");
    //   } else {
    //     return new LoadResult(
    //       false,
    //       null,
    //       INVALID_PATH_ERROR + " [" + filePath + "]"
    //     );
    //   }
    // }

    // if (filePath.slice(-10) === "_this.yaml") {
    //   // handle case where element content is YAML object
    //   let thisYamlResult = loadThisYaml(filePath, elementPath);
    //   if (elementPath in thisYamlResult.element) {
    //     return new LoadResult(
    //       true,
    //       thisYamlResult.element[elementPath],
    //       elementPath
    //     );
    //   } else {
    //     return thisYamlResult;
    //   }
    // } else if (filePath.slice(-5) === ".yaml") {
    //   // handle case where element content is a YAML list
    //   const aYamlList = yaml.load(elementContent);
    //   return loadYamlList(filePath, elementPath);
    // } else {
    //   // handle case where element content is a text document
    //   return new LoadResult(true, elementContent, elementPath);
    // }
  }
}

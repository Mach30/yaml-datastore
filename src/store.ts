import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";

export const INVALID_ELEMENT_NAME = "Error: Invalid element name";
export const INVALID_PATH_ERROR = "Error: Invalid path";
export const NONEMPTY_WORKINGDIR_PATH_ERROR =
  "Error: Working directory path is non-empty";
export const reserved_keywords = [
  "abstract",
  "arguments",
  "async",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "function",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "using",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];

/**
 * Represents results of a call to the store function
 */
export class StoreResult {
  private _success: boolean;
  private _message: string;

  /**
   * Default constructor for StoreResult
   *
   * @param success success status of store() operation
   * @param message message describing success status of store() operation
   * @returns new StoreResult object
   */
  constructor(success: boolean, message: string) {
    this._success = success;
    this._message = message;
  }
  /** @returns success status. */
  public get success() {
    return this._success;
  }
  /** @returns file path to root element serialized to disk on success or an explanation of the failure. */
  public get message() {
    return this._message;
  }
}

// validate element name to be conformant to rules for javascript variable name
function validateElementName(elementName: string): boolean {
  const javascriptVariableNameRegEx = new RegExp(/^[A-Za-z_$][A-Za-z0-9_$]*$/);
  return javascriptVariableNameRegEx.test(elementName);
}

// format YAML content to be serialized
function formatYaml(yamlContent: string): string {
  let result = yamlContent.replace("''", '""');
  return result;
}

// format file path string to be enclosed in double parentheses
function encloseInDoubleParentheses(filePath: string): string {
  return "((" + filePath + "))";
}

// serialize element as YAML object or list
function storeYaml(
  element: any,
  workingDirectoryPath: string,
  elementName: string
): StoreResult {
  // convert element to on-disk YAML representation
  let jsObjToSerialize: { [index: string]: any } = {};
  let dirPath = "";
  let filename = "";
  const keys = Object.keys(element);
  if (Array.isArray(element as { [index: string]: any })) {
    dirPath = workingDirectoryPath;
    filename = elementName + ".yaml";
    // iterate through items of list and replace complex data types with appropriate string-formatted file path
    keys.forEach((key) => {
      const value = element[key];
      if (typeof value === "string") {
        const stringValue: string = value;
        if (stringValue.includes("\n")) {
          // TODO: handle list to complex string case
        } else {
          // handle simple string case
          jsObjToSerialize[key] = value;
        }
      } else if (
        value === null ||
        typeof value !== "object" ||
        Object.keys(value).length === 0
      ) {
        // handle simple data type case
        jsObjToSerialize[key] = value;
      } else {
        // TODO: handle list of list-or-object case
      }
    });

    jsObjToSerialize = Object.values(jsObjToSerialize);
  } else {
    dirPath = path.join(workingDirectoryPath, elementName);
    fs.mkdirSync(dirPath);
    filename = "_this.yaml";
    // iterate through items of object and replace complex data types with appropriate string-formatted file path
    keys.forEach((key) => {
      const value = element[key];
      if (typeof value === "string") {
        const stringValue: string = value;
        if (stringValue.includes("\n")) {
          // handle complex string case
          const complexStringFilename = key.split("_").join(".");
          const complexStringFilePath = path.join(
            dirPath,
            complexStringFilename
          );
          jsObjToSerialize[key] = encloseInDoubleParentheses(
            complexStringFilename
          );

          fs.writeFileSync(complexStringFilePath, value);
        } else {
          // handle simple string case
          jsObjToSerialize[key] = value;
        }
      } else if (
        value === null ||
        typeof value !== "object" ||
        Object.keys(value).length === 0
      ) {
        // handle simple data type case
        jsObjToSerialize[key] = value;
      } else {
        // handle list or object case
        if (Array.isArray(value)) {
          jsObjToSerialize[key] = encloseInDoubleParentheses(key + ".yaml");
        } else if (typeof value === "object") {
          jsObjToSerialize[key] = encloseInDoubleParentheses(
            key + "/_this.yaml"
          );
        }
        store(value, dirPath, key);
      }
    });
  }
  const filePath = path.join(dirPath, filename);
  const yamlContentToSerialize = formatYaml(yaml.dump(jsObjToSerialize));

  // write YAML content do disk
  fs.writeFileSync(filePath, yamlContentToSerialize, "utf-8");

  return new StoreResult(true, filePath.toString());
}

/**
 * Dumps in-memory representation of contents to on-disk representation
 *
 * @param element object or list to store on-disk
 * @param workingDirectoryPath relative or absolute path to an empty working directory to store element in
 * @param elementName name of element to store
 * @returns a StoreResult containing the status of the call to store function
 */
export function store(
  element: object,
  workingDirectoryPath: string,
  elementName: string
): StoreResult {
  if (fs.existsSync(workingDirectoryPath)) {
    if (fs.readdirSync(workingDirectoryPath).length > 0) {
      return new StoreResult(
        false,
        NONEMPTY_WORKINGDIR_PATH_ERROR + " [" + workingDirectoryPath + "]"
      );
    } else {
      if (
        validateElementName(elementName) &&
        !reserved_keywords.includes(elementName)
      ) {
        return storeYaml(element, workingDirectoryPath, elementName);
      } else {
        return new StoreResult(
          false,
          INVALID_ELEMENT_NAME + " [" + elementName + "]"
        );
      }
    }
  }
  return new StoreResult(
    false,
    INVALID_PATH_ERROR + " [" + workingDirectoryPath + "]"
  );
}

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
  /** @returns (TBD) on success or an explanation of the failure. */
  public get message() {
    return this._message;
  }
}

// validate element name to be conformant to rules for javascript variable name
function validateElementName(elementName: string): boolean {
  const javascriptVariableNameRegEx = new RegExp(/^[A-Za-z_$][A-Za-z0-9_$]*$/);
  return javascriptVariableNameRegEx.test(elementName);
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
        //TODO
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

import shell from "shelljs";
import path from "path";
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

/**
 * Returns a in-memory representation of the element in working directory specified by element path
 *
 * @param workingDirectoryPath absolute file path to working directory containing yaml-datastore serialized content
 * @param elementPath object path (dot separated, with support for bracketed indexing for list elements) from working directory to element to be read into memory (e.g., top-element.sub-element.property[3])
 * @param depth integer from -1 to depth of element indicating how deep into element's hierachy to read into memory (-1 = read full depth. Defaults to -1)
 * @returns a LoadResult containing the status and content of the load function
 */
export function load(
  workingDirectoryPath: string,
  elementPath: string,
  depth: number = -1
): LoadResult {
  const lsWorkingDirectoryPath = shell.ls(workingDirectoryPath).stdout;
  if (
    workingDirectoryPath != "" &&
    lsWorkingDirectoryPath.includes(elementPath) &&
    depth == -1
  ) {
    const relativeElementPath = path.join(workingDirectoryPath, elementPath);
    const lsElementPath = shell.ls(relativeElementPath).stdout;
    if (lsElementPath.includes("_this.yaml")) {
      const thisYamlPath = path.join(relativeElementPath, "_this.yaml");
      const thisYaml = yaml.load(shell.cat(thisYamlPath).stdout);
      return new LoadResult(true, thisYaml, elementPath);
    }
  }
  return new LoadResult(false, null, "");
}

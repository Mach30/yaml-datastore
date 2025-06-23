export class LoadResult {
  private _success: boolean;
  private _element: any;
  private _message: string;

  constructor(success: boolean, element: any, message: string) {
    this._success = success;
    this._element = element;
    this._message = message;
  }
  public get success() {
    return this._success;
  }
  public get element() {
    return this._element;
  }
  /** contains element path on success */
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
 */
export function load(
  workingDirectoryPath: string,
  elementPath: string,
  depth: number = -1
): LoadResult {
  return new LoadResult(false, null, "");
}

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
    // anonymous function used for parsing strings enclosed between double parentheses
    const parseDoubleParentheses = function (aString: string): string {
      return (aString as any).split("((")[1].split("))")[0];
    };

    // parse elementPath as relative (file or directory) path
    let elementPathAsRelativePath = elementPath;
    const elementPathAsArray = elementPath.split(".");
    if (elementPathAsArray.length > 1) {
      // handle case where element filename has underscores
      const elementDirPath = elementPathAsArray.slice(0, -1).join("/");
      const elementSplitName = elementPathAsArray.slice(-1)[0].split("_");
      let elementName = "";
      let elementExt = "";
      let elementFilename = "";
      let fullElementDirPath = "";
      let lsFullElementDirPath = "";
      let fullElementFilePath = "";
      if (elementSplitName.length > 1) {
        // handle case where element is a YAML file
        elementName = elementSplitName.join("_");
        elementExt = "yaml";
        elementFilename = [elementName, elementExt].join(".");
        fullElementDirPath = path.join(workingDirectoryPath, elementDirPath);
        lsFullElementDirPath = shell.ls(fullElementDirPath).stdout;
        if (lsFullElementDirPath.includes(elementFilename)) {
          fullElementFilePath = path.join(fullElementDirPath, elementFilename);
          const elementContent = shell.cat(fullElementFilePath);
          const yamlContentAsJSON = yaml.load(elementContent);
          return new LoadResult(true, yamlContentAsJSON, elementPath);
        }

        // handle case where element is a text document
        elementName = elementSplitName.slice(0, -1).join("_");
        elementExt = elementSplitName.slice(-1)[0];
        elementFilename = [elementName, elementExt].join(".");
        fullElementDirPath = path.join(workingDirectoryPath, elementDirPath);
        lsFullElementDirPath = shell.ls(fullElementDirPath).stdout;
        if (lsFullElementDirPath.includes(elementFilename)) {
          fullElementFilePath = path.join(fullElementDirPath, elementFilename);
          const elementContent = shell.cat(fullElementFilePath);
          return new LoadResult(true, elementContent, elementPath);
        }
      } else {
        // handle case where element filename doesn't have underscores
        elementName = elementSplitName.join("");

        // handle case where element is a YAML file
        elementExt = "yaml";
        elementFilename = [elementName, elementExt].join(".");
        fullElementDirPath = path.join(workingDirectoryPath, elementDirPath);
        lsFullElementDirPath = shell.ls(fullElementDirPath).stdout;
        if (lsFullElementDirPath.includes(elementFilename)) {
          fullElementFilePath = path.join(fullElementDirPath, elementFilename);
          const elementContent = shell.cat(fullElementFilePath);
          const yamlContentAsJSON = yaml.load(elementContent);
          return new LoadResult(true, yamlContentAsJSON, elementPath);
        }

        // handle case where element is a text document
        elementFilename = elementName;
        fullElementDirPath = path.join(workingDirectoryPath, elementDirPath);
        lsFullElementDirPath = shell.ls(fullElementDirPath).stdout;
        if (lsFullElementDirPath.includes(elementFilename)) {
          fullElementFilePath = path.join(fullElementDirPath, elementFilename);
          const elementContent = shell.cat(fullElementFilePath);
          return new LoadResult(true, elementContent, elementPath);
        }
      }
    } else {
      const fullElementDirPath = path.join(
        workingDirectoryPath,
        elementPathAsRelativePath
      );
      const lsfullElementDirPath = shell.ls(fullElementDirPath).stdout;
      // determine if elementPathAsRelativePath is an object
      if (lsfullElementDirPath.includes("_this.yaml")) {
        const thisYamlFullPath = path.join(fullElementDirPath, "_this.yaml");
        let thisYaml = yaml.load(shell.cat(thisYamlFullPath).stdout);
        // iterate through elements of thisYaml and replace ((filepath)) with its associated complex data type
        Object.entries(thisYaml as any).forEach(([key, value]) => {
          const regex = /\(\(.*\)\)/;
          const re = new RegExp(regex);
          if (typeof value == "string") {
            if (re.test(value.toString())) {
              // parse filepath from ((filepath))
              const aComplexDataTypeFilePath = parseDoubleParentheses(value);
              const fullElementDirPath = path.join(
                workingDirectoryPath,
                elementPathAsRelativePath,
                aComplexDataTypeFilePath
              );
              const newWorkingDirectoryPath = fullElementDirPath
                .split("/")
                .slice(0, -2)
                .join("/");
              let newElementPath = "";
              if (fullElementDirPath.includes("_this.yaml")) {
                newElementPath = fullElementDirPath
                  .split("/")
                  .slice(-2, -1)
                  .join(".");
              } else {
                const fullElementDirPathAsArray = fullElementDirPath
                  .split("/")
                  .slice(-2, -1);
                const elementName = fullElementDirPath
                  .split("/")
                  .slice(-1)[0]
                  .replace(".yaml", "")
                  .replace(".", "_");
                fullElementDirPathAsArray.push(elementName);
                (newElementPath as any) = fullElementDirPathAsArray.join(".");
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
    }
  }
  return new LoadResult(false, null, "");
}

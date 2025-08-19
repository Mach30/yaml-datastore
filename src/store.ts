import path from "path";
import fs from "node:fs";
import yaml from "js-yaml";

/**
 * Represents results of a call to the store function
 */
export class StoreResult {
  //TODO
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
  return new StoreResult();
}

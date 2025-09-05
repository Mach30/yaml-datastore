[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / store

# Function: store()

> **store**(`element`, `workingDirectoryPath`, `elementName`): [`StoreResult`](../classes/StoreResult.md)

Defined in: [store.ts:20](https://github.com/Mach30/yaml-datastore/blob/418c20ab5ac220d9a8c99ddf0be28fa87954df85/src/store.ts#L20)

Dumps in-memory representation of contents to on-disk representation

## Parameters

### element

`object`

object or list to store on-disk

### workingDirectoryPath

`string`

relative or absolute path to an empty working directory to store element in

### elementName

`string`

name of element to store

## Returns

[`StoreResult`](../classes/StoreResult.md)

a StoreResult containing the status of the call to store function

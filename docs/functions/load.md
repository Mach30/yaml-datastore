[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / load

# Function: load()

> **load**(`workingDirectoryPath`, `elementPath`, `depth`): [`LoadResult`](../classes/LoadResult.md)

Defined in: [load.ts:66](https://github.com/Mach30/yaml-datastore/blob/28471083cfa333dfd0cf338ce5a0885ada63858b/src/load.ts#L66)

Returns a in-memory representation of the element in working directory specified by element path

## Parameters

### workingDirectoryPath

`string`

relative or absolute file path to working directory containing yaml-datastore serialized content

### elementPath

`string`

object path (dot separated, with support for bracketed indexing for list elements or key-value pairs in objects) from working directory to element to be read into memory (e.g., top-element.sub-element.property[3])

### depth

`number` = `-1`

integer from -1 to depth of element indicating how deep into element's hierachy to read into memory (-1 = read full depth. Defaults to -1)

## Returns

[`LoadResult`](../classes/LoadResult.md)

a LoadResult containing the status and content of the load function

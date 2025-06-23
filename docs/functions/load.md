[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / load

# Function: load()

> **load**(`workingDirectoryPath`, `elementPath`, `depth`): [`LoadResult`](../classes/LoadResult.md)

Defined in: [read.ts:30](https://github.com/Mach30/yaml-datastore/blob/a68a7a750328e67f616d31239ee50b9cadd57721/src/read.ts#L30)

Returns a in-memory representation of the element in working directory specified by element path

## Parameters

### workingDirectoryPath

`string`

absolute file path to working directory containing yaml-datastore serialized content

### elementPath

`string`

object path (dot separated, with support for bracketed indexing for list elements) from working directory to element to be read into memory (e.g., top-element.sub-element.property[3])

### depth

`number` = `-1`

integer from -1 to depth of element indicating how deep into element's hierachy to read into memory (-1 = read full depth. Defaults to -1)

## Returns

[`LoadResult`](../classes/LoadResult.md)

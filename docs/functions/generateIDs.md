[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / generateIDs

# Function: generateIDs()

> **generateIDs**(`numIDs`, `numSkip`): `string`[]

Defined in: [idgen.ts:53](https://github.com/Mach30/yaml-datastore/blob/107c3021f004a56bd84cceb19e99ed5c9de4599c/src/idgen.ts#L53)

Returns a list of short ID's

## Parameters

### numIDs

`number`

number of short ID's to generate

### numSkip

`number`

a kind of starting index for short ID's

## Returns

`string`[]

a list of short ID's or empty array if numIDs is not an integer or less than one or numSkip is not an integer or less than 0

[yaml-datastore](../README.md) / generateIDs

# Function: generateIDs()

```ts
function generateIDs(numIDs: number, numSkip: number): string[];
```

Defined in: [idgen.ts:53](https://github.com/Mach30/yaml-datastore/blob/f7c7f1145312852b0bb3299497096d232d2329e8/src/idgen.ts#L53)

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

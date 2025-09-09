[yaml-datastore](../README.md) / generateIDs

# Function: generateIDs()

```ts
function generateIDs(numIDs: number, numSkip: number): string[]
```

Defined in: [idgen.ts:53](https://github.com/Mach30/yaml-datastore/blob/a0344ee344b65666ac0f515abb889b7757bd912f/src/idgen.ts#L53)

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

[yaml-datastore](../README.md) / store

# Function: store()

```ts
function store(
   element: object, 
   workingDirectoryPath: string, 
   elementName: string): StoreResult;
```

Defined in: [store.ts:302](https://github.com/Mach30/yaml-datastore/blob/f7c7f1145312852b0bb3299497096d232d2329e8/src/store.ts#L302)

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

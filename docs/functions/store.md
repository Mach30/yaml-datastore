[yaml-datastore](../README.md) / store

# Function: store()

```ts
function store(
   element: object, 
   workingDirectoryPath: string, 
   elementName: string): StoreResult
```

<<<<<<< HEAD
Defined in: [store.ts:302](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/store.ts#L302)
=======
Defined in: [store.ts:302](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/store.ts#L302)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

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

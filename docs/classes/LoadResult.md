[yaml-datastore](../README.md) / LoadResult

# Class: LoadResult

<<<<<<< HEAD
Defined in: [load.ts:104](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/load.ts#L104)
=======
Defined in: [load.ts:104](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/load.ts#L104)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

Represents results of a call to the load function

## Constructors

### Constructor

```ts
new LoadResult(
   success: boolean, 
   element: any, 
   message: string): LoadResult
```

<<<<<<< HEAD
Defined in: [load.ts:117](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/load.ts#L117)
=======
Defined in: [load.ts:117](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/load.ts#L117)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

Default constructor for LoadResult

#### Parameters

##### success

`boolean`

success status of load() operation

##### element

`any`

element read into memory by load() operation

##### message

`string`

message describing success status of load() operation

#### Returns

`LoadResult`

new LoadResult object

## Accessors

### element

#### Get Signature

```ts
get element(): any
```

<<<<<<< HEAD
Defined in: [load.ts:131](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/load.ts#L131)
=======
Defined in: [load.ts:131](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/load.ts#L131)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

##### Returns

`any`

element read into memory on success or null on failure.

***

### message

#### Get Signature

```ts
get message(): string
```

<<<<<<< HEAD
Defined in: [load.ts:135](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/load.ts#L135)
=======
Defined in: [load.ts:135](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/load.ts#L135)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

##### Returns

`string`

element path on success or an explanation of the failure.

***

### success

#### Get Signature

```ts
get success(): boolean
```

<<<<<<< HEAD
Defined in: [load.ts:127](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/load.ts#L127)
=======
Defined in: [load.ts:127](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/load.ts#L127)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

##### Returns

`boolean`

success status.

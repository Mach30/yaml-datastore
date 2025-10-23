[yaml-datastore](../README.md) / StoreResult

# Class: StoreResult

<<<<<<< HEAD
Defined in: [store.ts:100](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/store.ts#L100)
=======
Defined in: [store.ts:100](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/store.ts#L100)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

Represents results of a call to the store function

## Constructors

### Constructor

```ts
new StoreResult(success: boolean, message: string): StoreResult
```

<<<<<<< HEAD
Defined in: [store.ts:111](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/store.ts#L111)
=======
Defined in: [store.ts:111](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/store.ts#L111)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

Default constructor for StoreResult

#### Parameters

##### success

`boolean`

success status of store() operation

##### message

`string`

message describing success status of store() operation

#### Returns

`StoreResult`

new StoreResult object

## Accessors

### message

#### Get Signature

```ts
get message(): string
```

<<<<<<< HEAD
Defined in: [store.ts:120](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/store.ts#L120)
=======
Defined in: [store.ts:120](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/store.ts#L120)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

##### Returns

`string`

file path to root element serialized to disk on success or an explanation of the failure.

***

### success

#### Get Signature

```ts
get success(): boolean
```

<<<<<<< HEAD
Defined in: [store.ts:116](https://github.com/Mach30/yaml-datastore/blob/e451325fe9bf3598551544bebb589660dd5461b8/src/store.ts#L116)
=======
Defined in: [store.ts:116](https://github.com/Mach30/yaml-datastore/blob/c1c38b7ca884104d253f024d3c7bc3639f2d91c5/src/store.ts#L116)
>>>>>>> refs/remotes/origin/on-disk-representation-docs

##### Returns

`boolean`

success status.

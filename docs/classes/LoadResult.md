[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / LoadResult

# Class: LoadResult

Defined in: [load.ts:63](https://github.com/Mach30/yaml-datastore/blob/65dbd111e9866fc3c2803ef00a07ee8b23c440eb/src/load.ts#L63)

Represents results of a call to the load function

## Constructors

### Constructor

> **new LoadResult**(`success`, `element`, `message`): `LoadResult`

Defined in: [load.ts:76](https://github.com/Mach30/yaml-datastore/blob/65dbd111e9866fc3c2803ef00a07ee8b23c440eb/src/load.ts#L76)

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

> **get** **element**(): `any`

Defined in: [load.ts:90](https://github.com/Mach30/yaml-datastore/blob/65dbd111e9866fc3c2803ef00a07ee8b23c440eb/src/load.ts#L90)

##### Returns

`any`

element read into memory on success or null on failure.

***

### message

#### Get Signature

> **get** **message**(): `string`

Defined in: [load.ts:94](https://github.com/Mach30/yaml-datastore/blob/65dbd111e9866fc3c2803ef00a07ee8b23c440eb/src/load.ts#L94)

##### Returns

`string`

element path on success or an explanation of the failure.

***

### success

#### Get Signature

> **get** **success**(): `boolean`

Defined in: [load.ts:86](https://github.com/Mach30/yaml-datastore/blob/65dbd111e9866fc3c2803ef00a07ee8b23c440eb/src/load.ts#L86)

##### Returns

`boolean`

success status.

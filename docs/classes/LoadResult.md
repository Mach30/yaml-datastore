[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / LoadResult

# Class: LoadResult

Defined in: [load.ts:4](https://github.com/Mach30/yaml-datastore/blob/107c3021f004a56bd84cceb19e99ed5c9de4599c/src/load.ts#L4)

Represents results of a call to the load function

## Constructors

### Constructor

> **new LoadResult**(`success`, `element`, `message`): `LoadResult`

Defined in: [load.ts:17](https://github.com/Mach30/yaml-datastore/blob/107c3021f004a56bd84cceb19e99ed5c9de4599c/src/load.ts#L17)

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

Defined in: [load.ts:27](https://github.com/Mach30/yaml-datastore/blob/107c3021f004a56bd84cceb19e99ed5c9de4599c/src/load.ts#L27)

##### Returns

`any`

element read into memory on success or null on failure.

***

### message

#### Get Signature

> **get** **message**(): `string`

Defined in: [load.ts:31](https://github.com/Mach30/yaml-datastore/blob/107c3021f004a56bd84cceb19e99ed5c9de4599c/src/load.ts#L31)

##### Returns

`string`

element path on success or an explanation of the failure.

***

### success

#### Get Signature

> **get** **success**(): `boolean`

Defined in: [load.ts:23](https://github.com/Mach30/yaml-datastore/blob/107c3021f004a56bd84cceb19e99ed5c9de4599c/src/load.ts#L23)

##### Returns

`boolean`

success status.

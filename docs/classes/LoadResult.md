[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / LoadResult

# Class: LoadResult

Defined in: [load.ts:107](https://github.com/Mach30/yaml-datastore/blob/bf7efc38a18e9ed74c617929a202ddd5dfb75f96/src/load.ts#L107)

Represents results of a call to the load function

## Constructors

### Constructor

> **new LoadResult**(`success`, `element`, `message`): `LoadResult`

Defined in: [load.ts:120](https://github.com/Mach30/yaml-datastore/blob/bf7efc38a18e9ed74c617929a202ddd5dfb75f96/src/load.ts#L120)

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

Defined in: [load.ts:134](https://github.com/Mach30/yaml-datastore/blob/bf7efc38a18e9ed74c617929a202ddd5dfb75f96/src/load.ts#L134)

##### Returns

`any`

element read into memory on success or null on failure.

***

### message

#### Get Signature

> **get** **message**(): `string`

Defined in: [load.ts:138](https://github.com/Mach30/yaml-datastore/blob/bf7efc38a18e9ed74c617929a202ddd5dfb75f96/src/load.ts#L138)

##### Returns

`string`

element path on success or an explanation of the failure.

***

### success

#### Get Signature

> **get** **success**(): `boolean`

Defined in: [load.ts:130](https://github.com/Mach30/yaml-datastore/blob/bf7efc38a18e9ed74c617929a202ddd5dfb75f96/src/load.ts#L130)

##### Returns

`boolean`

success status.

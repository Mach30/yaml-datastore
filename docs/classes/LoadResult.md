[**yaml-datastore**](../README.md)

***

[yaml-datastore](../README.md) / LoadResult

# Class: LoadResult

Defined in: [load.ts:8](https://github.com/Mach30/yaml-datastore/blob/89fdca848a70e744e3dc591eccee1ffc52a5f89e/src/load.ts#L8)

Represents results of a call to the load function

## Constructors

### Constructor

> **new LoadResult**(`success`, `element`, `message`): `LoadResult`

Defined in: [load.ts:21](https://github.com/Mach30/yaml-datastore/blob/89fdca848a70e744e3dc591eccee1ffc52a5f89e/src/load.ts#L21)

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

Defined in: [load.ts:35](https://github.com/Mach30/yaml-datastore/blob/89fdca848a70e744e3dc591eccee1ffc52a5f89e/src/load.ts#L35)

##### Returns

`any`

element read into memory on success or null on failure.

***

### message

#### Get Signature

> **get** **message**(): `string`

Defined in: [load.ts:39](https://github.com/Mach30/yaml-datastore/blob/89fdca848a70e744e3dc591eccee1ffc52a5f89e/src/load.ts#L39)

##### Returns

`string`

element path on success or an explanation of the failure.

***

### success

#### Get Signature

> **get** **success**(): `boolean`

Defined in: [load.ts:31](https://github.com/Mach30/yaml-datastore/blob/89fdca848a70e744e3dc591eccee1ffc52a5f89e/src/load.ts#L31)

##### Returns

`boolean`

success status.

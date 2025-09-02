# Introduction

TBD

<!-- include (docs/README.md) -->
**yaml-datastore**

***

# yaml-datastore

## Classes

- [LoadResult](classes/LoadResult.md)

## Functions

- [generateIDs](functions/generateIDs.md)
- [load](functions/load.md)
<!-- /include -->

# Examples

<!-- include (test/spec/1.1_object_with_simple_data_types/README.md) -->
### Object with Simple Data Types
#### The Model to Store
```json
{
  "name": "John Smith",
  "age": 42,
  "attending": true,
  "plusOne": null,
  "state": "WA",
  "degrees": {},
  "aliases": [],
  "notes": ""
}
```
#### Generated Directory Structure
```txt
model
└── _this.yaml
```
#### Generated Files
##### `model/_this.yaml`
```yaml
name: John Smith
age: 42
attending: true
plusOne:
state: WA
degrees: {}
aliases: []
notes: ""
```
<!-- /include -->


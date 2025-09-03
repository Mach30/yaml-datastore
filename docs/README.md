<!-- !toc (numbered) -->

1\. [Introduction](#introduction) <br>
1.1\. [What is yaml-datastore](#what-is-yaml-datastore) <br>
1.2\. [Motivation](#motivation) <br>
1.3\. [Documentation Overview](#documentation-overview) <br>
2\. [API v0.0.0](#api-v000) <br>
2.1\. [Classes](#classes) <br>
2.2\. [Functions](#functions) <br>
3\. [On Disk Representation](#on-disk-representation) <br>
3.1\. [Explanation of the Algorithm](#explanation-of-the-algorithm) <br>
3.1.1\. [What Can Be Stored](#what-can-be-stored) <br>
3.1.2\. [Data Types](#data-types) <br>
3.1.3\. [Storage Approach](#storage-approach) <br>
3.2\. [Examples](#examples) <br>
3.2.1\. [Object with Simple Data Types](#object-with-simple-data-types) <br>

<!-- toc! -->

# Introduction

general intro

## What is yaml-datastore

explain the lib, its components, and its general function

## Motivation

more detailed explanation of why we wrote this library

## Documentation Overview

provide summary of the remainder of the document

<!-- include (docs/README.md) -->
# API v0.0.0

## Classes

- [LoadResult](classes/LoadResult.md)

## Functions

- [generateIDs](functions/generateIDs.md)
- [load](functions/load.md)
<!-- /include -->

# On Disk Representation

include brief intro to this section

## Explanation of the Algorithm

this is where we will explain the basic "rules", with subheadings to structure the conversation

### What Can Be Stored

Objects/Lists and their contents

### Data Types

Introduce simple and complex types

### Storage Approach

How we take an object or list and "spread" it out on the disk

## Examples

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


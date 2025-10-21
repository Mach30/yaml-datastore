<!-- !toc (numbered) -->
1\. [Introduction](#introduction) <br>
1.1\. [What is YAML Datastore](#what-is-yaml-datastore) <br>
1.1.1\. [Components](#components) <br>
1.1.2\. [CLI Tools](#cli-tools) <br>
1.1.3\. [Helper Classes](#helper-classes) <br>
1.2\. [Getting Started](#getting-started) <br>
2\. [YAML Datastore Documentation](#yaml-datastore-documentation) <br>
2.1\. [Overview](#overview) <br>
2.2\. [About On Disk Representation](#about-on-disk-representation) <br>
2.2.1\. [How it works](#how-it-works) <br>
2.3\. [Data Types and their On Disk Representations](#data-types-and-their-on-disk-representations) <br>
2.3.1\. [Object with Simple Data Types](#object-with-simple-data-types) <br>
2.3.2\. [Object with Complex String](#object-with-complex-string) <br>
2.3.3\. [Object with Object of Simple Data Types](#object-with-object-of-simple-data-types) <br>
2.3.4\. [Object with List of Simple Data Type](#object-with-list-of-simple-data-type) <br>
2.3.5\. [Object with List of Simple Data Types](#object-with-list-of-simple-data-types) <br>
2.3.6\. [Object with List of Objects of Simple Data Types](#object-with-list-of-objects-of-simple-data-types) <br>
2.3.7\. [Object with List of List of Simple Data Type](#object-with-list-of-list-of-simple-data-type) <br>
2.4\. [API Docs](#api-docs) <br>
3\. [API v0.0.0](#api-v000) <br>
3.1\. [Classes](#classes) <br>
3.2\. [Functions](#functions) <br>
<!-- toc! -->
# Introduction
![Bart Simpson in front of chalkboard writing repeatedly "GIT IS NOT A DATABASE"](./bartsimpsonmeme.png)
</br>
"Git is not a database."—but what if it was? With YAML datastore, you can make your data Git-friendly. YAML Datastore is a lightweight library that stores and manages data with structured plaintext files and YAML syntax, designed for use with version control systems. This enables you to gain the advantages of Git for your data—track changes at the feature level, store data across multiple systems, and merge data seamlessly. 
## What is YAML Datastore
YAML Datastore is a lightweight Typescript library designed for observable, human-readable data storage and retrieval using YAML files. It serves as an alternative to traditional databases that do not store data in a version control-friendly way.
YAML Datastore exists because we rather than try to add Git-like features to how we store and manage data, we want to do data management in a way that fits in Git. We found that existing systems attempting to use Git as a backend didn't account properly for structure. YAML Datastore automatically manages this structure with easy to understand rules that we explain later in this documentation. 
### Components
YAML Datastore implements the standard CRUD operations for file-based data.
- The `store` and `load` transform in-memory objects and lists into structured YAML files and back.
### CLI Tools
- `yds-store`: Command-line interface for storing data.
- `yds-load`: Command-line interface for loading data.
- `yds-ids`: Command-line interface for generating ids
### Helper Classes
- The results class captures operation outcomes, including status and content.
## Getting Started
1. Installation Steps
# YAML Datastore Documentation
## Overview
The documentation below provides comprehensive details about how YAML Datastore manages data. 
* About On Disk Representation
* Data Types and their On Disk Representation
* API Docs
## About On Disk Representation
This section explains how the YAML Datastore library organizes and stores data on disk. It covers the algorithm used to transform in-memory objects and lists into a collection of YAML files, the data types supported, and the conventions followed for file layout. 
### How it works
The datastore uses a set of straightforward rules to map the data into YAML files and directories. This approach ensures that data is always human-readable, modular, and easy to reconstruct.
#### What Can Be Stored
You can store:
- **Objects**: Any object with key-value pairs, including nested objects.
- **Lists (Arrays)**: Arrays of values, objects, or other lists.
- **Nested Structures**: Both objects and lists can be nested to any depth, allowing you to represent complex models.
#### Data Types
The algorithm supports **simple** and **complex** data types:
- **Simple Types**: Strings, numbers, booleans, nulls. These are stored directly in the YAML file.
- **Complex Types**: Multi-line strings, large objects/lists, and references. 
  - Multi-line strings are stored in separate files, referenced from their parent object.
  - Nested objects and lists can be split into their own files for modularity and clarity.
    
#### Storage Approach
When you store data:
- The top-level object or list is written to a YAML file in the designated directory.
- Simple values (numbers, strings, booleans) are saved inline.
- Complex values (multi-line strings, nested objects/lists) are saved in separate files. Their parent YAML file contains a special marker referencing the file (e.g., `((filename.yaml))`).
- Each object or list gets a unique filename or directory structure based on its name and position in the hierarchy.
## Data Types and their On Disk Representations
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
plusOne: null
state: WA
degrees: {}
aliases: []
notes: ''
```
<!-- /include -->
<!-- include (test/spec/1.2.1_object_with_complex_string/README.md) -->
### Object with Complex String
#### The Model to Store
```json
{
  "songTitle": "Mary Had a Little Lamb",
  "album": "Classic Childrens Songs 2",
  "track": 17,
  "lyrics_txt": "Mary had a little lamb,\nIt's fleece was white as snow;\nAnd everywhere that Mary went\nThe lamb was sure to go."
}
```
#### Generated Directory Structure
```txt
model
├── lyrics.txt
└── _this.yaml
```
#### Generated Files
##### `model/_this.yaml`
```yaml
songTitle: Mary Had a Little Lamb
album: Classic Childrens Songs 2
track: 17
lyrics_txt: ((lyrics.txt))
```
##### `model/lyrics.txt`
```txt
Mary had a little lamb,
It's fleece was white as snow;
And everywhere that Mary went
The lamb was sure to go.
```
<!-- /include -->
<!-- include (test/spec/1.2.2_object_with_object_of_simple_data_types/README.md) -->
### Object with Object of Simple Data Types
#### The Model to Store
```json
{
  "firstName": "Tony",
  "lastName": "Stark",
  "age": 48,
  "address": {
    "streetAddress": "10880 Malibu Point",
    "city": "Malibu",
    "state": "CA",
    "postalCode": "90265"
  }
}
```
#### Generated Directory Structure
```txt
model
├── address
│   └── _this.yaml
└── _this.yaml
```
#### Generated Files
##### `model/_this.yaml`
```yaml
firstName: Tony
lastName: Stark
age: 48
address: ((address/_this.yaml))
```
##### `model/address/_this.yaml`
```txt
streetAddress: 10880 Malibu Point
city: Malibu
state: CA
postalCode: '90265'
```
<!-- /include -->
!include (test/spec/1.2.3_object_with_object_of_simple_data_types/README.md)
<!-- include (test/spec/1.2.4_object_with_list_of_simple_data_type/README.md) -->
### Object with List of Simple Data Type
#### The Model to Store
```json
{
  "companyName": "ACME, Inc",
  "employees": [
    "John",
    "Anna",
    "Peter"
  ],
  "foundedYear": 1949
}
```
#### Generated Directory Structure
```txt
model
├── employees.yaml
└── _this.yaml
```
#### Generated Files
##### `model/_this.yaml`
```yaml
companyName: ACME, Inc
employees: ((employees.yaml))
foundedYear: 1949
```
##### `model/employees.yaml`
```yaml
- John
- Anna
- Peter
```
<!-- /include -->
<!-- include (test/spec/1.2.5_object_with_list_of_simple_data_types/README.md) -->
### Object with List of Simple Data Types
#### The Model to Store
```json
{
  "personInfo": [
    "John Smith",
    42,
    true,
    null,
    "WA"
  ]
}
```
#### Generated Directory Structure
```txt
model
├── personInfo.yaml
└── _this.yaml
```
#### Generated Files
##### `model/_this.yaml`
!include (model/_this.yaml lang=yaml)
##### `model/personInfo.yaml`
```yaml
- John Smith
- 42
- true
- null
- WA
```
<!-- /include -->
!include (test/spec/1.2.6_object_with_list_of_complex_strings/READEME.md)
<!-- include (test/spec/1.2.7.1_object_with_list_of_objects_of_simple_data_types/README.md) -->
### Object with List of Objects of Simple Data Types
#### The Model to Store
!include (model.json lang=json)
#### Generated Directory Structure
!include (.model_tree.txt lang=txt)
#### Generated Files
##### `model/_this.yaml`
!include (model/_this.yaml lang=yaml)
##### `model/avengers.yaml`
```yaml
- ((avengers_E16F4F/_this.yaml))
- ((avengers_506E59/_this.yaml))
- ((avengers_A28836/_this.yaml))
```
##### `model/avengers_506E59/_this.yaml`
```yaml
firstName: Tony
lastName: Stark
age: 48
```
##### `model/avengers_A28836/_this.yaml`
```yaml
firstName: Thor
lastName: Odinson
age: 1500
```
##### `model/avengers_E16F4F/_this.yaml`
```yaml
firstName: Steve
lastName: Rogers
age: 94
```
<!-- /include -->
<!-- include (test/spec/1.2.7.2_object_with_list_of_list_of_simple_data_type/README.md) -->
### Object with List of List of Simple Data Type
#### The Model to Store
!include (model.json lang=json)
#### Generated Directory Structure
!include (.model_tree.txt lang=txt)
#### Generated Files
##### `model/_this.yaml`
!include (model/_this.yaml lang=yaml)
##### `model/matrix.yaml`
```yaml
- ((matrix_E16F4F.yaml))
- ((matrix_506E59.yaml))
- ((matrix_A28836.yaml))
```
##### `model/matrix_506E59.yaml`
```yaml
- 4
- 5
- 6
```
##### `model/matrix_A28836.yaml`
```yaml
- 7
- 8
- 9
```
##### `model/matrix_E16F4F.yaml`
```yaml
- 1
- 2
- 3
```
<!-- /include -->
## API Docs
<!-- include (docs/README.md) -->
# API v0.0.0
## Classes
- [LoadResult](classes/LoadResult.md)
- [StoreResult](classes/StoreResult.md)
## Functions
- [generateIDs](functions/generateIDs.md)
- [load](functions/load.md)
- [store](functions/store.md)
<!-- /include -->

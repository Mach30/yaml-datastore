<!-- !toc (numbered) -->
1\. [Introduction](#introduction) <br>
1.1\. [What is YAML Datastore](#what-is-yaml-datastore) <br>
1.1.1\. [Components](#components) <br>
1.1.2\. [CLI Tools](#cli-tools) <br>
1.1.3\. [Helper Classes](#helper-classes) <br>
1.2\. [Goals](#goals) <br>
1.3\. [Getting Started](#getting-started) <br>
1.4\. [Documentation Overview](#documentation-overview) <br>
2\. [API v0.0.0](#api-v000) <br>
2.1\. [Classes](#classes) <br>
2.2\. [Functions](#functions) <br>
3\. [On Disk Representation](#on-disk-representation) <br>
3.1\. [Explanation of the Algorithm](#explanation-of-the-algorithm) <br>
3.1.1\. [What Can Be Stored](#what-can-be-stored) <br>
3.1.2\. [Data Types](#data-types) <br>
3.1.3\. [Storage Approach](#storage-approach) <br>
3.2\. [Data Types and their On Disk Representations](#data-types-and-their-on-disk-representations) <br>
3.2.1\. [Object with Simple Data Types](#object-with-simple-data-types) <br>
3.2.2\. [Object with Complex String](#object-with-complex-string) <br>
3.2.3\. [Object with Object of Simple Data Types](#object-with-object-of-simple-data-types) <br>
<!-- toc! -->
# Introduction
![Bart Simpson in front of chalkboard writing repeatedly "GIT IS NOT A DATABASE"](./bartsimpsonmeme.png)
</br>
"Git is not a database."—but what if it was? With YAML datastore, you can make your data Git-friendly. YAML Datastore is a lightweight library that stores and manages data with structured plaintext files and YAML syntax, designed for use with version control systems. This enables you to gain the advantages of Git for your data—track changes at the feature level, store data across multiple systems, and merge data seamlessly. 
## What is YAML Datastore
- The YAML Datastore library is a Typescript library (can be used with Typescript and Javascript projects) designed to provide a lightweight, simple, human-readable data storage and retrieval using YAML files.
- It serves as an alternative to traditional databases that do not store data in a version control-friendly way.
### Components
- CRUD Functions
- - The `store` and `load` transform in-memory objects and lists into structured YAML files and back.
- ### CLI Tools
- `yds-store`: Command-line interface for storing data.
- `yds-load`: Command-line interface for loading data.
- `yds-ids`: Command-line interface for generating ids
### Helper Classes
- Results class captures operation outcomes, including status and content.
## Goals
YAML Datastore exists because we don't want to add Git-like features to how we store and manage data—we want to do data management in a way that fits in Git. We found that existing systems attempting to use Git as a backend did not account properly for structure. YAML Datastore automatically manages the complexity of data stored with easy to understand rules. 
## Getting Started
1. Installation Steps
## Documentation Overview
The documentation below provides comprehensive details about all the Data Types with examples. typedoc generated documentation
Deep dive into the algorithm, rationale for how it works
then a series of examples demonstrating the algorithm and use cases (Cover top level) section on API, section on examples
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
# On Disk Representation
This section explains how the YAML Datastore library organizes and stores data on disk. It covers the algorithm used to transform in-memory objects and lists into a collection of YAML files, the data types supported, and the conventions followed for file layout. 
## Explanation of the Algorithm
The datastore uses a set of straightforward rules to map the data into YAML files and directories. This approach ensures that data is always human-readable, modular, and easy to reconstruct.
### What Can Be Stored
You can store:
- **Objects**: Any object with key-value pairs, including nested objects.
- **Lists (Arrays)**: Arrays of values, objects, or other lists.
- **Nested Structures**: Both objects and lists can be nested to any depth, allowing you to represent complex models.
### Data Types
The algorithm supports **simple** and **complex** data types:
- **Simple Types**: Strings, numbers, booleans, nulls. These are stored directly in the YAML file.
- **Complex Types**: Multi-line strings, large objects/lists, and references. 
  - Multi-line strings are stored in separate files, referenced from their parent object.
  - Nested objects and lists can be split into their own files for modularity and clarity.
    
### Storage Approach
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

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
3.2.2\. [Object with Complex String](#object-with-complex-string) <br>
3.2.3\. [Object with Object of Simple Data Types](#object-with-object-of-simple-data-types) <br>
<!-- toc! -->
# Introduction
![Bart Simpson in front of chalkboard writing repeatedly "GIT IS NOT A DATABASE"](./bartsimpsonmeme.png)
</br>
"Git is not a database."—but what if it was? With YAML datastore, you can make your data Git-friendly. YAML Datastore is a lightweight library that stores and manages data with structured plaintext files and YAML syntax, designed for use with version control systems. This enables you to gain the advantages of Git for your data—track changes at the feature level, store data across multiple systems, and merge data seamlessly. 
## What is YAML Datastore
- The YAML Datastore library is designed to provide a lightweight, simple, human-readable data storage and retrieval using YAML files.
- It serves as an alternative to traditional databases that do not store data in a version control-friendly way.

## How it Works
### Major Components
- **Datastore Core:** The `store` and `load` functions manage serialization/deserialization of objects and lists to/from YAML files.
- **Result Classes:** `LoadResult` and `StoreResult` encapsulate operation outcomes, including status and content.
- **ID Generation:** The `generateIDs` function helps organize list/object storage with unique identifiers.
- **Configuration via Parameters:** Paths, element names, and depth are passed directly to functions.

### Data Flow and Interactions
1. **Initialization:** User invokes `store` or `load`, specifying relevant paths and parameters.
2. **Loading Data:** `load` reads YAML files recursively, reconstructing in-memory objects/lists.
3. **Data Operations:** Manipulates data in memory, then re-stores to persist changes.
4. **Persistence:** `store` writes updated data structures to disk, managing complex types and references across multiple files.

## Goals
more detailed explanation of why we wrote this library

## Getting Started
Installation steps

### CLI Interactions
- `yds-store`: Command-line interface for storing data.
- `yds-load`: Command-line interface for loading data.
- Options include specifying working directories, element paths, output formats, and depth.

### Workflow Example

1. **Storing Data**
   - Use `store()` to write an object or list to disk.
   - Internally, `storeYaml()` handles serialization.
   - Complex structures are broken into multiple YAML files; strings may be stored separately.
   - Result is returned as a `StoreResult`.

2. **Loading Data**
   - Use `load()` to read data from disk.
   - Internally, `loadYaml()` reconstructs complex structures from files.
   - Result is returned as a `LoadResult`, with access to loaded content and status.

3. **ID Generation**
   - Use `generateIDs()` for deterministic short IDs when storing lists or objects.

## Documentation Overview
Summarize rest of the documentation

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
This section explains how the YAML Datastore library organizes and stores data on disk. It covers the algorithm used to transform in-memory objects and lists into a collection of YAML files, the data types supported, and the conventions followed for file layout. These details will help you understand your datastore’s files.

## Explanation of the Algorithm
The datastore uses a set of straightforward rules to map objects and lists into YAML files and directories. This approach ensures that data is always human-readable, modular, and easy to reconstruct.

### Main Classes
- **LoadResult**  
  Represents the result of a data load operation.  
  Key accessors:  
  - `success` (boolean): Indicates if the load was successful.  
  - `element` (any): The loaded data structure.  
  - `message` (string): Path or error message.

- **StoreResult**  
  Represents the result of a store operation, indicating status and details.

### Main Functions
- **load(workingDirectoryPath, elementPath, depth)**  
  Returns an in-memory representation of the element from a given directory and path.  
  - `workingDirectoryPath`: Directory containing yaml-datastore data.  
  - `elementPath`: Dot/bracket notation path to element (e.g., `user.profile[0].name`).  
  - `depth`: How deep to read into the hierarchy (`-1` for full depth).  
  Returns a `LoadResult` instance.

- **store(element, workingDirectoryPath, elementName)**  
  Dumps an object or list to disk in YAML format.  
  - `element`: Data to store (object or array).  
  - `workingDirectoryPath`: Target directory.  
  - `elementName`: Name for the top-level element.  
  Returns a `StoreResult` instance.

- **generateIDs(numIDs, numSkip)**  
  Generates a list of short IDs for naming elements/files.

### Internal Helper Functions
- `storeYaml(...)`, `loadYaml(...)`:  
  Handle serialization/deserialization of complex objects, lists, and strings.
- `encloseInDoubleParentheses(...)`, `generateObjectOrListFilename(...)`, `elementNameFromFileName(...)`:  
  Format file paths, names, and string representations.


### What Can Be Stored
You can store:
- **Objects**: Any object with key-value pairs, including nested objects.
- **Lists (Arrays)**: Arrays of values, objects, or other lists.
- **Nested Structures**: Both objects and lists can be nested to any depth, allowing you to represent complex models.

### Data Types
The algorithm supports:
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

This approach makes it easy to inspect, back up, or version control your data using standard tools.

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

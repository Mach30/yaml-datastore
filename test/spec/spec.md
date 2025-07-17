# spec

temporary list of specs in markdown

## data types

### simple

- strings (without new lines)
- numbers
- booleans
- null
- empty object
- empty list

### complex

- objects
- lists
- strings (with new lines)

### full list of supported types

- simple strings
- numbers
- booleans
- null
- complex strings
- objects
- lists

## top-level entities

- object
- list

### objects

- 1.1_object_with_simple_data_types: all contents are simple
- 1.2_object_with_complex_data_type
  - 1.2.1_object_with_complex_string
  - 1.2.2_object_with_object_of_simple_data_types
  - 1.2.3_object_with_object_of_complex_data_types
  - 1.2.4_object_with_list_of_simple_data_type
  - 1.2.5_object_with_list_of_simple_data_types
  - 1.2.6_object_with_list_of_complex_strings
  - 1.2.7_object_with_list_of_complex_data_types
    - 1.2.7.1_object_with_list_of_objects_of_simple_data_types
    - 1.2.7.2_object_with_list_of_list_of_simple_data_type
- 1.3_object_with_complex_data_types
  - 1.3.1_object_with_two_complex_strings
  - 1.3.2_object_with_two_objects_of_simple_data_types
  - 1.3.3_object_with_two_objects_of_complex_data_types
  - 1.3.4_object_with_two_lists_of_simple_data_type
  - 1.3.5_object_with_two_lists_of_simple_data_types
  - 1.3.6_object_with_two_lists_of_complex_strings
  - 1.3.7_object_with_two_lists_of_complex_data_types
    - 1.3.7.1_object_with_two_lists_of_objects_of_simple_data_types
    - 1.3.7.2_object_with_two_lists_of_list_of_simple_data_type
- 1.4_object_with_empty_elements
  - 1.4.1_object_with_empty_object
  - 1.4.2_object_with_empty_list

### lists

- 2.1_list_of_simple_data_types: all contents are simple
- 2.2_list_of_complex_data_type
  - 2.2.1_list_of_complex_string
  - 2.2.2_list_of_objects_of_simple_data_types
  - 2.2.3_list_of_objects_of_complex_data_types
  - 2.2.4_list_of_list_of_simple_data_type
  - 2.2.5_list_of_list_of_simple_data_types
  - 2.2.6_list_of_list_of_complex_strings
  - 2.2.7_list_of_list_of_complex_data_types
    - 2.2.7.1_list_of_list_of_objects_of_simple_data_types
    - 2.2.7.2_list_of_list_of_list_of_simple_data_type
- 2.3_list_with_empty_elements
  - 2.3.1_list_with_empty_object
  - 2.3.2_list_with_empty_list

### representative objects

- 3.1_legacy_project

## elementPath meanings

| Case name                                    | elementPath  | object interpretation                      | list interpretation                        | complex string interpretation              | simple value interpretation          | comments                                                  |
| -------------------------------------------- | ------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------ | --------------------------------------------------------- |
| empty element path                           |              | `load("_this.yaml")`                       | N/A                                        | N/A                                        | N/A                                  | should error if no `_this.yaml` exists                    |
| simple element path                          | model        | `load("model/_this.yaml")`                 | `load("model.yaml")`                       | `load(load("_this.yaml").model)`           | `load("_this.yaml").model`           | need to verify file path to complex string content exists |
| object property element path                 | model.foo    | `load(load("model/_this.yaml")["foo"])`    | `load(load("model/_this.yaml")["foo"])`    | `load(load("model/_this.yaml")["foo"])`    | `load("model/_this.yaml")["foo"]`    |                                                           |
| list item of an object property element path | model.foo[1] | `load(load("model/_this.yaml")["foo"][1])` | `load(load("model/_this.yaml")["foo"][1])` | `load(load("model/_this.yaml")["foo"][1])` | `load("model/_this.yaml")["foo"][1]` | should error if no `_this.yaml` exists                    |
| list item element path                       | model[1]     | `load(load("model.yaml")[1])`              | `load(load("model.yaml")[1])`              | `load(load("model.yaml")[1])`              | `load("model.yaml")[1]`              |                                                           |
| object property of a list item element path  | model[1].foo | `load(load(load("model.yaml")[1])["foo"])` | `load(load(load("model.yaml")[1])["foo"])` | `load(load(load("model.yaml")[1])["foo"])` | `load(load("model.yaml")[1])["foo"]` | `model[1]` must be an object, error otherwise             |
| list item of a list item element path        | model[1][5]  | `load(load(load("model.yaml")[1])[5])`     | `load(load(load("model.yaml")[1])[5])`     | `load(load(load("model.yaml")[1])[5])`     | `load(load("model.yaml")[1])[5]`     | `model[1]` must be a list, error otherwise                |

### notes

test/spec/3.1_legacy_project/ | model.assemblySteps[0].summary | load(load(load("model/\_this.yaml")["assemblySteps"])[0])["summary"]

- model/\_this.yaml
- ["assemblySteps"] -> assemblySteps.yaml
- [0] -> assemblySteps_E16F4F/\_this.yaml

- get 1st entry of elementPath and load 0-depth load of that elementPath
- take next piece of elementPath and access its contents at given location
- if contents accessed requires loading, then perform 0-depth load of that elementPath
- take next piece of elementPath and access its contents... bc thing (if property) is in contents of last filepath, unless it's an object, list, or file.

ergo...

- when empty elementPath only 1 case, cwd is an object
- when simple elementPath, 4 conditions to test, (obj, list, complex string/simple value)
- everything else is one of two cases,
  - elementPath points to a complex object (i.e., object, list, complex string)
  - elementPath points at a simple property

observation: latter two cases are either dot separated or bracketed

- find first element entry path, e.g., model
- find list of remaining entry path elements, e.g., myList = ["assemblySteps", "0", "summary"]
- temp = model | file path: model/\_this.yaml
- temp = temp[myList[0]] | file path: assemblySteps.yaml
- temp = temp[myList[1]] | file path: assemblySteps_E16F4F/\_this.yaml
- temp = temp[myList[2]] | accesses "summary"

model/assemblySteps_E16F4F/\_this.yaml

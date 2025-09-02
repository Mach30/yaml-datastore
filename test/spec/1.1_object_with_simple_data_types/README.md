### Object with Simple Data Types
#### The Model to Store
<!-- include (model.json lang=json) -->
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
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
└── _this.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
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

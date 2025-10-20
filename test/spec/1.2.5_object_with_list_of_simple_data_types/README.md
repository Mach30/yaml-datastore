### Object with List of Simple Data Types
#### The Model to Store
<!-- include (model.json lang=json) -->
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
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── personInfo.yaml
└── _this.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
personInfo: ((personInfo.yaml))
```
<!-- /include -->
##### `model/personInfo.yaml`
<!-- include (model/personInfo.yaml lang=yaml) -->
```yaml
- John Smith
- 42
- true
- null
- WA
```
<!-- /include -->

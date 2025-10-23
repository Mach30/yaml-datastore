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
```yaml
personInfo: ((personInfo.yaml))
```
##### `model/personInfo.yaml`
```yaml
- John Smith
- 42
- true
- null
- WA
```

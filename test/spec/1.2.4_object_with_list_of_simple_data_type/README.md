### Object with List of Simple Data Type
#### The Model to Store
<!-- include (model.json lang=json) -->
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
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── employees.yaml
└── _this.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
companyName: ACME, Inc
employees: ((employees.yaml))
foundedYear: 1949
```
<!-- /include -->
##### `model/employees.yaml`
<!-- include (model/employees.yaml lang=yaml) -->
```yaml
- John
- Anna
- Peter
```
<!-- /include -->

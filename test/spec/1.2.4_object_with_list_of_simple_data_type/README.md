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

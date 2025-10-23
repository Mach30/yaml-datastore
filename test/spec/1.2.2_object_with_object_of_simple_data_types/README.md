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

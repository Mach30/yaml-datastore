### Object with Object of Simple Data Types

#### The Model to Store

<!-- include (model.json lang=json) -->
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
<!-- /include -->

#### Generated Directory Structure

<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── address
│   └── _this.yaml
└── _this.yaml
```
<!-- /include -->

#### Generated Files

##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
firstName: Tony
lastName: Stark
age: 48
address: ((address/_this.yaml))
```
<!-- /include -->

##### `model/address/_this.yaml`
<!-- include (model/address/_this.yaml lang=txt) -->
```txt
streetAddress: 10880 Malibu Point
city: Malibu
state: CA
postalCode: '90265'
```
<!-- /include -->


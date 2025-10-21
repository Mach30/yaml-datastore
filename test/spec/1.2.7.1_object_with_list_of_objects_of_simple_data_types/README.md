### Object with List of Objects of Simple Data Types
#### The Model to Store
<!-- include (model.json lang=json) -->
```json
{
  "avengers": [
    {
      "firstName": "Steve",
      "lastName": "Rogers",
      "age": 94
    },
    {
      "firstName": "Tony",
      "lastName": "Stark",
      "age": 48
    },
    {
      "firstName": "Thor",
      "lastName": "Odinson",
      "age": 1500
    }    
  ]
}
```
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── avengers_506E59
│   └── _this.yaml
├── avengers_A28836
│   └── _this.yaml
├── avengers_E16F4F
│   └── _this.yaml
├── avengers.yaml
└── _this.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
avengers: ((avengers.yaml))
```
<!-- /include -->
##### `model/avengers.yaml`
<!-- include (model/avengers.yaml lang=yaml) -->
```yaml
- ((avengers_E16F4F/_this.yaml))
- ((avengers_506E59/_this.yaml))
- ((avengers_A28836/_this.yaml))
```
<!-- /include -->
##### `model/avengers_506E59/_this.yaml`
<!-- include (model/avengers_506E59/_this.yaml lang=yaml) -->
```yaml
firstName: Tony
lastName: Stark
age: 48
```
<!-- /include -->
##### `model/avengers_A28836/_this.yaml`
<!-- include (model/avengers_A28836/_this.yaml lang=yaml) -->
```yaml
firstName: Thor
lastName: Odinson
age: 1500
```
<!-- /include -->
##### `model/avengers_E16F4F/_this.yaml`
<!-- include (model/avengers_E16F4F/_this.yaml lang=yaml) -->
```yaml
firstName: Steve
lastName: Rogers
age: 94
```
<!-- /include -->

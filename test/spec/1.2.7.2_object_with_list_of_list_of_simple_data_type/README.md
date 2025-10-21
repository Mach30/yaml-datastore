### Object with List of List of Simple Data Type
#### The Model to Store
<!-- include (model.json lang=json) -->
```json
{
  "matrix": [
    [
      1,
      2,
      3
    ],
    [
      4,
      5,
      6
    ],
    [
      7,
      8,
      9
    ]
  ]
}
```
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── matrix_506E59.yaml
├── matrix_A28836.yaml
├── matrix_E16F4F.yaml
├── matrix.yaml
└── _this.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
matrix: ((matrix.yaml))
```
<!-- /include -->
##### `model/matrix.yaml`
<!-- include (model/matrix.yaml lang=yaml) -->
```yaml
- ((matrix_E16F4F.yaml))
- ((matrix_506E59.yaml))
- ((matrix_A28836.yaml))
```
<!-- /include -->
##### `model/matrix_506E59.yaml`
<!-- include (model/matrix_506E59.yaml lang=yaml) -->
```yaml
- 4
- 5
- 6
```
<!-- /include -->
##### `model/matrix_A28836.yaml`
<!-- include (model/matrix_A28836.yaml lang=yaml) -->
```yaml
- 7
- 8
- 9
```
<!-- /include -->
##### `model/matrix_E16F4F.yaml`
<!-- include (model/matrix_E16F4F.yaml lang=yaml) -->
```yaml
- 1
- 2
- 3
```
<!-- /include -->

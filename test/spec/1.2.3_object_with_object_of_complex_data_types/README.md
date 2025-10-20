### Object with Object of Complex Data Types
#### The Model to Store
<!-- include (model.json lang=json) -->
```json
{
  "myObj": {
    "lyrics_txt": "Mary had a little lamb,\nIt's fleece was white as snow;\nAnd everywhere that Mary went\nThe lamb was sure to go.",
    "personInfo": {
      "name": "John Smith",
      "age": 42,
      "attending": true,
      "plusOne": null,
      "state": "WA"
    },
    "primeNumbers": [
      2,
      3,
      5,
      7,
      11
    ]
  }
}
```
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── myObj
│   ├── lyrics.txt
│   ├── personInfo
│   │   └── _this.yaml
│   ├── primeNumbers.yaml
│   └── _this.yaml
└── _this.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
myObj: ((myObj/_this.yaml))
```
<!-- /include -->
##### `model/myObj/_this.yaml`
<!-- include (model/myObj/_this.yaml lang=yaml) -->
```yaml
lyrics_txt: ((lyrics.txt))
personInfo: ((personInfo/_this.yaml))
primeNumbers: ((primeNumbers.yaml))
```
<!-- /include -->
##### `model/myObj/lyrics.txt`
<!-- include (model/myObj/lyrics.txt lang=txt) -->
```txt
Mary had a little lamb,
It's fleece was white as snow;
And everywhere that Mary went
The lamb was sure to go.
```
<!-- /include -->
##### `model/myObj/primeNumbers.yaml`
<!-- include (model/myObj/primeNumbers.yaml lang=yaml) -->
```yaml
- 2
- 3
- 5
- 7
- 11
```
<!-- /include -->
##### `model/myObj/personInfo/_this.yaml`
<!-- include (model/myObj/personInfo/_this.yaml lang=yaml) -->
```yaml
name: John Smith
age: 42
attending: true
plusOne: null
state: WA
```
<!-- /include -->

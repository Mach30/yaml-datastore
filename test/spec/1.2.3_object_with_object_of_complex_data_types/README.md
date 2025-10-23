### Object with Object of Complex Data Types
#### The Model to Store
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
#### Generated Directory Structure
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
#### Generated Files
##### `model/_this.yaml`
```yaml
myObj: ((myObj/_this.yaml))
```
##### `model/myObj/_this.yaml`
```yaml
lyrics_txt: ((lyrics.txt))
personInfo: ((personInfo/_this.yaml))
primeNumbers: ((primeNumbers.yaml))
```
##### `model/myObj/lyrics.txt`
```txt
Mary had a little lamb,
It's fleece was white as snow;
And everywhere that Mary went
The lamb was sure to go.
```
##### `model/myObj/primeNumbers.yaml`
```yaml
- 2
- 3
- 5
- 7
- 11
```
##### `model/myObj/personInfo/_this.yaml`
```yaml
name: John Smith
age: 42
attending: true
plusOne: null
state: WA
```

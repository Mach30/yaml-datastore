### Object with List of Complex Strings
#### The Model to Store
<!-- include (model.json lang=json) -->
```json
{
  "songTitle": "Mary Had a Little Lamb",
  "album": "Classic Childrens Songs 2",
  "track": 17,
  "verses_txt": [
    "Mary had a little lamb,\nIt's fleece was white as snow;\nAnd everywhere that Mary went\nThe lamb was sure to go.", 
    "He followed her to school one day\nWhich was against the rule;\nIt made the children laugh and play,\nTo see a lamb at school.", 
    "And so the teacher turned him out,\nBut still he lingered near;\nAnd waited patiently about\nTill Mary did appear", 
    "\"What makes the lamb love Mary so?\""
  ]
}
```
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── _this.yaml
├── verses_506E59.txt
├── verses_A28836.txt
├── verses_E16F4F.txt
└── verses_txt.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
songTitle: Mary Had a Little Lamb
album: Classic Childrens Songs 2
track: 17
verses_txt: ((verses_txt.yaml))
```
<!-- /include -->
##### `model/verses_txt.yaml`
<!-- include (model/verses_txt.yaml lang=yaml) -->
```yaml
- ((verses_E16F4F.txt))
- ((verses_506E59.txt))
- ((verses_A28836.txt))
- '"What makes the lamb love Mary so?"'
```
<!-- /include -->
##### `model/verses_506E59.txt`
<!-- include (model/verses_506E59.txt lang=txt) -->
```txt
He followed her to school one day
Which was against the rule;
It made the children laugh and play,
To see a lamb at school.
```
<!-- /include -->
##### `model/verses_A28836.txt`
<!-- include (model/verses_A28836.txt lang=txt) -->
```txt
And so the teacher turned him out,
But still he lingered near;
And waited patiently about
Till Mary did appear
```
<!-- /include -->
##### `model/verses_E16F4F.txt`
<!-- include (model/verses_E16F4F.txt lang=txt) -->
```txt
Mary had a little lamb,
It's fleece was white as snow;
And everywhere that Mary went
The lamb was sure to go.
```
<!-- /include -->

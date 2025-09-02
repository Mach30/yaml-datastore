### Object with Complex String
#### The Model to Store
<!-- include (model.json lang=json) -->
```json
{
  "songTitle": "Mary Had a Little Lamb",
  "album": "Classic Childrens Songs 2",
  "track": 17,
  "lyrics_txt": "Mary had a little lamb,\nIt's fleece was white as snow;\nAnd everywhere that Mary went\nThe lamb was sure to go."
}
```
<!-- /include -->
#### Generated Directory Structure
<!-- include (.model_tree.txt lang=txt) -->
```txt
model
├── lyrics.txt
└── _this.yaml
```
<!-- /include -->
#### Generated Files
##### `model/_this.yaml`
<!-- include (model/_this.yaml lang=yaml) -->
```yaml
songTitle: Mary Had a Little Lamb
album: Classic Childrens Songs 2
track: 17
lyrics_txt: ((lyrics.txt))
```
<!-- /include -->
##### `model/lyrics.txt`
<!-- include (model/lyrics.txt lang=txt) -->
```txt
Mary had a little lamb,
It's fleece was white as snow;
And everywhere that Mary went
The lamb was sure to go.
```
<!-- /include -->

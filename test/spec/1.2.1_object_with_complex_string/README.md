### Object with Complex String
#### The Model to Store
```json
{
  "songTitle": "Mary Had a Little Lamb",
  "album": "Classic Childrens Songs 2",
  "track": 17,
  "lyrics_txt": "Mary had a little lamb,\nIt's fleece was white as snow;\nAnd everywhere that Mary went\nThe lamb was sure to go."
}
```
#### Generated Directory Structure
```txt
model
├── lyrics.txt
└── _this.yaml
```
#### Generated Files
##### `model/_this.yaml`
```yaml
songTitle: Mary Had a Little Lamb
album: Classic Childrens Songs 2
track: 17
lyrics_txt: ((lyrics.txt))
```
##### `model/lyrics.txt`
```txt
Mary had a little lamb,
It's fleece was white as snow;
And everywhere that Mary went
The lamb was sure to go.
```

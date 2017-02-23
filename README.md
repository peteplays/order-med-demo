# Order Med Demo

## This UI reads from a DB and updates as new data is added to the DB.

## Usage
- clone repo
- `npm i`
- [install mongodb](https://docs.mongodb.com/manual/installation/)
- start mongod
- `npm start` - starts UI at port `http://localhost:5555/`

## Contents
- `server.js`
- `db.js`
- `www` -> `index.html`, `main.js`, `main.less`

### DB
`db.js`
default db is `drugs` and the collection is `docs`

The data comes from [https://api.ai/](https://api.ai/)

`checkDBStatus` - checks if the db is active

`getAll` - gets all documents in the db

`addData` - adds a document to the db

## Author
PetePlays

## License
This project is licensed under the MIT license.

## Contributions
Forks, Comments, and Upgrades are welcome!

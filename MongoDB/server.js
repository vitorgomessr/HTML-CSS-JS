// require("dotenv").config()     // como configurei no node_modules não é necessário
// npm i -D dotenv
// NODE_ENV=development node server    NODE_ENV pode ser qualquer nome

const app = require("./src/app")
const connectDB = require("./src/db/connect")
const url = process.env.MONGO_URL

const PORT = process.env.PORT || 3000

const main = async ()=>{
    try{
        await connectDB(url)
        app.listen(PORT)
        console.log(PORT)
    }catch(e){
        console.log(e)
    }
}

main()

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// O código abaixo é pra configurar usando o mongodb, mas vamos usar o mongoose
/*
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

// Database Name
const dbName = 'toDoListDb';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
*/
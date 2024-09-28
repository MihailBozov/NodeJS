import { MongoClient } from 'mongodb';
// import mongodb from 'mongodb';


const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);
// const client = new mongodb.MongoClient(url);

const dbName = 'myProject';

async function main() {
    await client.connect();
    console.log('Connected Successfully to the server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
    await collection.insertOne({ name: 'Pesho' })

    return 'done!';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())
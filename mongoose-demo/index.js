import mongoose from "mongoose";

const url = 'mongodb://localhost:27017';

async function main() {
    await mongoose.connect(`${url}/test`);
    console.log('Successfully connecting to the database!')
    
    return 'done!'
}

main()
    .then(console.log)
    .catch(console.error)
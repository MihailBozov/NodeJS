import express from 'express';
import mongoose from "mongoose";
import Student from './models/Student.js'

const url = 'mongodb://localhost:27017';

async function main() {
    await mongoose.connect(`${url}/myProject`);
    console.log('Successfully connecting to the database!')

    return 'done!'
}

main()
    .then(console.log)
    .catch(console.error);

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello from express');
})

app.get('/students/create', (req, res) => {
    res.send(`
        <form method="post">
        <input type="text" name="name" placeholder="Name">
        <input type="number" name="age" placeholder="Age">
        <input type="submit" value="create">
        </form>
        `);
})

// Read from a db
app.get('/students', async (req, res) => {
    const students = await Student.find().lean();
    res.json(students);
})


// Create new record in a db
app.post('/students/create', async (req, res) => {
    const student = await Student.create(req.body);

    console.log(student);
    res.redirect('/students')
})

//update record in a db

app.get('/students/:id/update', async (req, res) => {
    const student = await Student.findById(req.params.id);

    res.send(`
        <form method="post">
            <input type="text" name="name" value="${student.name}" placeholder="Name">
            <input type="number" name="age" value="${student.age}" placeholder="Age">
            <input type="submit" value="update">
        </form>
        `)

    console.log(student);
})

app.post('/students/:id/update', async (req, res) => {

    // 1st way
    // const student = await Student.findById(req.params.id);
    // student.name = req.body.name;
    // student.age = Number(req.body.age);
    // await student.save();
    
    // 2nd way
    // const student = await Student.findByIdAndUpdate(req.params.id, req.body);
    
    // 3rd way 
    const student = await Student.replaceOne({ _id: req.params.id }, req.body)

    console.log(student);
    res.redirect('/students');
})



app.listen(5000, () => console.log('Listening on port 5000'));
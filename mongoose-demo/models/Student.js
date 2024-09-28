import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: String,
    age: Number
})

const Student = model('Student', studentSchema);

export default Student;

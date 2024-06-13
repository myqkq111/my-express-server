import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title : { type: String, required: true, unique: true},
    description : { type: String, required: true},
    completed : { type: Boolean, default: false},
    dueDate : {type: Date, default: Date.now},
    userId : { type: mongoose.Types.ObjectId }
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
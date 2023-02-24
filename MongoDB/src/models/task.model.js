const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, maxlength: 150},
    completed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, required: false},
    userId: {type: String, required: true, trim: true}
})

module.exports = mongoose.model("Task", taskSchema)
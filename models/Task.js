const mongoose = require("mongoose");

// We start by defining a schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name!"],
    trim: true,
    maxLength: [20, "Name cannot be longer than 20 characters!"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Then we compile the schema into a model (which is a class) that
// is going to be used to create documents
module.exports = mongoose.model("Task", TaskSchema);

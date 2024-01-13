const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
    trim: true,
    maxlength: [20, "Name can not be more than 20"],
  },

  priority: { type: String, required: [true, "Must provide a priority"] },
  category: { type: String, required: [true, "Must provide a category"] },
});

module.exports = mongoose.model("Task", taskSchema);

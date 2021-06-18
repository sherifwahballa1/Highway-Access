const mongoose = require("mongoose");

const Employee = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: [125, "Max Length is 127 characters"],
    },
    age: { type: Number, required: true },
    position: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", Employee);

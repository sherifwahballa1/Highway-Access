const mongoose = require("mongoose");

const Car = new mongoose.Schema(
  {
    plateNo: {
      type: String,
      required: true,
      unique: true
    },
    employeeID: { type: mongoose.Types.ObjectId, ref: 'ُEmployee', required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", Car);

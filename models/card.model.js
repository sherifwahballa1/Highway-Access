const { date } = require("joi");
const mongoose = require("mongoose");

const Card = new mongoose.Schema(
  {
    carID: { type: mongoose.Types.ObjectId, ref: "Car", required: true },
    credits: { type: Number, required: true, default: 0 },
    lastPassTime: { type: Date, default: new Date(+new Date() - 60 * 1000) },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", Card);

const mongoose = require("mongoose");

const Car = new mongoose.Schema(
  {
    plateNo: {
      type: String,
      required: true,
      unique: true,
    },
    employeeID: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

Car.query.byID = function (id) {
  return this.where({ _id: mongoose.Types.ObjectId(id) });
};

// before find & findOne & findById queries
// select specific fields and populate employeeID
Car.pre(/^find/, function (next) {
  this.find({});
  this.select("_id brand model plateNo employeeID").populate(
    "employeeID",
    "name age position"
  );
  next();
});

module.exports = mongoose.model("Car", Car);

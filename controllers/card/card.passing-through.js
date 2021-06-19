const mongoose = require("mongoose");
const catchAsync = require("../../utils/catchAsync");
const Car = require("../../models/car.model");
const Card = require("../../models/card.model");
const { newCardValidation } = require("../../validations/card.validation");

passingThrough = catchAsync(async (req, res) => {
  const { error, value } = newCardValidation.validate(req.params);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  // validate type of carID
  if (!mongoose.isValidObjectId(value.carID))
    return res.status(400).json({ message: "Invalid carID" });

  // check if car exists
  const car = await Car.findOne().byID(value.carID);

  if (!car)
    return res
      .status(401)
      .json({ message: "There's not exist car with this id" });

  // check if card with this car id exists
  const card = await Card.findOne({
    carID: mongoose.Types.ObjectId(value.carID),
  });

  if (!card)
    return res
      .status(401)
      .json({ message: "There's not exist card access for this car" });

  if ((Date.now() - new Date(card.lastPassTime)) / (1000 * 60) > 1) {
    if (card.credits < 4)
      // validate credits in the access card
      return res
        .status(400)
        .json({ message: "Your card credits not enough please charge it" });

    card.credits -= 4;
    card.lastPassTime = Date.now();
    await card.save();
  }

  return res.status(200).json({ balance: card.credits });
});

module.exports = passingThrough;

const mongoose = require("mongoose");
const createError = require("http-errors");

const Car = require("../../models/car.model");
const Card = require("../../models/card.model");

const catchAsync = require("../../utils/catchAsync");
const { newCardValidation } = require("../../validations/card.validation");

passingThrough = catchAsync(async (req, res) => {
  const { error, value } = newCardValidation.validate(req.params);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  // validate type of carID
  if (!mongoose.isValidObjectId(value.carID))
    return next(createError(400, "Invalid car ID"));

  // check if car exists
  const car = await Car.findOne().byID(value.carID);

  if (!car)
    return next(createError(401, "There's not exists car with this id"));

  // check if card with this car id exists
  const card = await Card.findOne({
    carID: mongoose.Types.ObjectId(value.carID),
  });

  if (!card)
    return next(createError(401, "There's not exist card access for this car"));

  // check the last pass time if exceed 1 min to charge again
  if ((Date.now() - new Date(card.lastPassTime)) / (1000 * 60) > 1) {
    // validate the access card balance
    if (card.credits < 4)
      return next(
        createError(400, "Your card balance not enough please charge it")
      );

    card.credits -= 4;
    card.lastPassTime = Date.now();
    await card.save();
  }

  return res.status(200).json({ balance: card.credits });
});

module.exports = passingThrough;

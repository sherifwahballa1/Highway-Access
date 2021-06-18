const mongoose = require("mongoose");
const catchAsync = require("./../../utils/catchAsync");
const Car = require("./../../models/car.model");
const Card = require("./../../models/card.model");
const { newCardValidation } = require("./../../validations/card.validation");

createNewCard = catchAsync(async (req, res) => {
  const { error, value } = newCardValidation.validate(req.body);
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

  if (card)
    return res.status(409).json({ message: "Car already registered before" });

  value.credits = 10;

  let newCard = await Card.create(value);
  return res.status(200).send(newCard);
});

module.exports = createNewCard;

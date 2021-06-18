const catchAsync = require("../../utils/catchAsync");
const { pagination } = require("../../validations/car.validation");

const Car = require("../../models/car.model");

carsInfo = catchAsync(async (req, res) => {
  let { error, value } = pagination.validate(req.query, {
    stripUnknown: true,
  });
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  const queryLimitNo = Number.parseInt(value.limitNo);
  const querySkipNo = Number.parseInt(value.pageNo) * queryLimitNo;

  // perform pagination
  // to decreasing query time response
  let cars = await Car.find().skip(querySkipNo).limit(queryLimitNo);

  // numebr or total cars
  let totalCount = await Car.find({}).countDocuments();

  return res.status(200).send({ cars, total: totalCount });
});

module.exports = carsInfo;

const Car = require("../../models/car.model");

const catchAsync = require("../../utils/catchAsync");
const { pagination } = require("../../validations/car.validation");

// performing pagination to decreasing query time response
carsInfo = catchAsync(async (req, res, next) => {
  // validate pagination input fields
  let { error, value } = pagination.validate(req.query, {
    stripUnknown: true,
  });
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  if (!value.limit) value.limit = 20;
  if (!value.pageNo) value.pageNo = 0;
  const queryLimitNo = Number.parseInt(value.limit);
  const querySkipNo = Number.parseInt(value.pageNo) * queryLimitNo;

  let cars = await Car.find().skip(querySkipNo).limit(queryLimitNo);

  // numebr of total registered cars
  let totalCount = await Car.find({}).countDocuments();

  return res.status(200).send({ cars, total: totalCount });
});

module.exports = carsInfo;

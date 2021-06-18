const joi = require("joi");

const createSchema = {
  carID: joi.string().required().messages({
    "string.empty": `carID cannot be an empty`,
    "any.required": `carID is required`,
  }),
};

module.exports = {
  newCardValidation: joi.object(createSchema),
};

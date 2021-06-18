const joi = require("joi");

const createSchema = {
  name: joi
    .string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": `name must be consists of letters only`,
      "string.empty": `name cannot be an empty`,
      "string.pattern.base": `name must be consists of letters only`,
      "any.required": `name is required`,
    }),
  age: joi
    .string()
    .required()
    .pattern(/^([1-9][0-9])$/)
    .messages({
      "string.base": `age must be consists of numbers only`,
      "string.empty": `age cannot be an empty`,
      "string.pattern.base": "invalid age",
      "any.required": `age is required`,
    }),
  position: joi
    .string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .messages({
      "string.base": `position must be consists of letters and numbers only`,
      "string.empty": `position cannot be an empty`,
      "string.pattern.base": `position must be consists of letters and numbers only`,
      "any.required": `position is required`,
    }),
};

module.exports = {
  newEmployeeValidation: joi.object(createSchema),
};

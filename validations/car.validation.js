const joi = require("joi");

const paginationSchema = {
  pageNo: joi
    .string()
    .trim()
    .pattern(/^[0-9]*$/) // find a way to limit the number according to number of documents
    .message("Enter a valid number"),
  limit: joi
    .string()
    .trim()
    .pattern(/^[0-9]*$/) // find a way to limit the number according to number of documents
    .message("Enter a valid number"),
};

const createSchema = {
  brand: joi
    .string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": `brand name must be consists of letters only`,
      "string.empty": `brand name cannot be an empty`,
      "string.pattern.base": `brand name must be consists of letters only`,
      "any.required": `brand name is required`,
    }),
  model: joi
    .string()
    .required()
    .pattern(/^(19|20)\d{2}$/)
    .messages({
      "string.base": `model must be consists of numbers only`,
      "string.empty": `model cannot be an empty`,
      "string.pattern.base":
        "model must be consists of numbers and valid year from 1900 : 2099",
      "any.required": `model is required`,
    }),
  plateNo: joi
    .string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .messages({
      "string.base": `plate number must be consists of letters and numbers only`,
      "string.empty": `plate number cannot be an empty`,
      "string.pattern.base": `plate number must be consists of letters and numbers only`,
      "any.required": `plate number is required`,
    }),
  employeeID: joi.string().required().messages({
    "string.empty": `employeeID cannot be an empty`,
    "any.required": `employeeID is required`,
  }),
};

const updateSchema = {
  carID: joi.string().required().messages({
    "string.empty": `car ID cannot be an empty`,
    "any.required": `car ID is required`,
  }),
  brand: joi
    .string()
    .trim()
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      "string.base": `brand name must be consists of letters only`,
      "string.empty": `brand name cannot be an empty`,
      "string.pattern.base": `brand name must be consists of letters only`,
    }),
  model: joi
    .string()
    .pattern(/^(19|20)\d{2}$/)
    .messages({
      "string.base": `model must be consists of numbers only`,
      "string.empty": `model cannot be an empty`,
      "string.pattern.base":
        "model must be consists of numbers and valid year from 1900 : 2099",
    }),
  plateNo: joi
    .string()
    .trim()
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .messages({
      "string.base": `plate number must be consists of letters and numbers only`,
      "string.empty": `plate number cannot be an empty`,
      "string.pattern.base": `plate number must be consists of letters and numbers only`,
      "any.required": `plate number is required`,
    }),
};

module.exports = {
  newCarValidation: joi.object(createSchema),
  updateCarValidation: joi.object(updateSchema),
  pagination: joi.object(paginationSchema),
};

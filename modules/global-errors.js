// to handle 404 status code (not found)
const Error4O4 = (req, res, next) => {
  res.status(404).json({ message: "404: File Not Found" });
};

// global errors 500, 400, 401, 409
// 400	BadRequest
// 401	Unauthorized
// 402	PaymentRequired
// 403	Forbidden
// 405	MethodNotAllowed
// 409	Conflict
// 408	RequestTimeout
// 429	TooManyRequests
// 501	NotImplemented
// 503	ServiceUnavailable
// 504	GatewayTimeout
// 423	Locked
// 413	PayloadTooLarge
// 411	LengthRequired
const Error500 = (error, req, res, next) => {
  console.log(error);
  if (error.status === 500 || error.status === undefined) {
    // Handle 500
    res
      .status(500)
      .json({ title: "500: Internal Server Error", message: error });
  } else res.status(error.status).json({ message: error.message, error });
};

module.exports = {
  Error4O4,
  Error500,
};

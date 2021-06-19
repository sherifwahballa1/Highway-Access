const mongoose = require("mongoose");
const Logger = require("./../logs/db");

const dbConnection = () => {
  // database connection
  mongoose.connect(
    process.env.DB_URL || "mongodb://localhost:27017/highway_access",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {}
  );

  // logs db connection errors
  Logger.dbConnection(mongoose);
};

module.exports = {
  dbConnection,
};

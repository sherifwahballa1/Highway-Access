const chai = require("chai");
const faker = require("faker");
const { beforeEach } = require("mocha");
const { expect, should } = chai;
require("mocha");
const request = require("supertest");

describe("Testing Update car PATCH api/car", () => {
  describe("Update Validation Schema", () => {
    describe("Car carID Validation", () => {
      car_Data_Without_carID = {};
      car_data_with_empty_carID = {};
      car_Data_With_Invalid_carID = {};
      beforeEach(() => {
        car_Data_Without_carID = {
          brand: faker.name.title().split(" ")[0],
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          plateNo:
            faker.name.firstName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
        };

        car_data_with_empty_carID = {
          carID: "",
          brand: faker.name.title().split(" ")[0],
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          plateNo:
            faker.name.firstName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
        };

        car_Data_With_Invalid_carID = {
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          brand: faker.name.title().split(" ")[0],
          plateNo:
            faker.name.firstName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
          carID: faker.address.latitude().toString(),
        };
      });
      it("carID Required", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(car_Data_Without_carID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("car ID is required");
          });
      });

      it("carID is empty filed", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(car_data_with_empty_carID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("car ID cannot be an empty");
          });
      });

      it("invalid carID", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(car_Data_With_Invalid_carID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("Invalid car ID");
          });
      });
    });

    describe("Car valid ID and empty inputs", () => {
      empty_fields = {};
      beforeEach(() => {
        empty_fields = {
          carID: require("mongoose").Types.ObjectId(),
        };
      });
      it("empty inputs", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(empty_fields)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Not provided data to update car info");
          });
      });
    });

    describe("Car valid ID and car not exists", () => {
      car_not_exists = {};
      beforeEach(() => {
        car_not_exists = {
          carID: require("mongoose").Types.ObjectId(),
          model: "2002",
        };
      });
      it("car with this id not exists", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(car_not_exists)
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("There's not exists car with this id");
          });
      });
    });

    describe("Car update with invalid data", () => {
      car_with_empty_field = {};
      car_with_invalid_field = {};
      beforeEach(() => {
        car_with_empty_field = {
          carID: "60cd210db01e666f0030caff",
          model: "",
          brand: "nissan",
        };

        car_with_invalid_field = {
          carID: "60cd210db01e666f0030caff",
          model: "2009",
          brand: "$%%^%D55",
        };
      });
      it("car with empty fields", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(car_with_empty_field)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body).be.a("object").to.have.property("message");
          });
      });

      it("car with invalid fields", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(car_with_invalid_field)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body).be.a("object").to.have.property("message");
          });
      });
    });

    describe("Car update with valud data", () => {
      car_with_valid_data = {};
      beforeEach(() => {
        car_with_valid_data = {
          carID: "60cd210db01e666f0030caff",
          model: "2018",
          brand: "nissan",
        };
      });
      it("car with valid fields", () => {
        return request("localhost:5000/api")
          .patch("/car")
          .send(car_with_valid_data)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).be.a("object").to.have.property("message");
          });
      });
    });
  });
});

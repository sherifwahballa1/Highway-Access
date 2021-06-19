const chai = require("chai");
const faker = require("faker");
const { beforeEach } = require("mocha");
const { expect, should } = chai;
require("mocha");
const request = require("supertest");

describe("Testing get car by id GET api/car/:carID", () => {
  describe("Update Validation Schema", () => {
    describe("Car carID Validation", () => {
      let invalidCarID;
      beforeEach(() => {
        invalidCarID = 10;
      });
      it("carID invalid", () => {
        return request("localhost:5000/api")
          .get(`/car/${invalidCarID}`)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Invalid carID");
          });
      });
    });

    describe("Car not registered", () => {
      let carID;
      beforeEach(() => {
        carID = "60cd210db01e666f0030caf1";
      });
      it("carID not exists", () => {
        return request("localhost:5000/api")
          .get(`/car/${carID}`)
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("There's not exists car with this id");
          });
      });
    });

    describe("Car id valid", () => {
      let carID;
      beforeEach(() => {
        carID = "60cd210db01e666f0030caff";
      });
      it("carID exists", () => {
        return request("localhost:5000/api")
          .get(`/car/${carID}`)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).be.a("object");
          });
      });
    });
  });
});

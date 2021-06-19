const chai = require("chai");
const faker = require("faker");
const { beforeEach } = require("mocha");
const { expect, should } = chai;
require("mocha");
const request = require("supertest");

describe("Testing create card POST api/card", () => {
  describe("Create Validation Schema", () => {
    describe("Card carID Validation", () => {
      let invalidCarID = {};
      let emptyCarID = {};
      beforeEach(() => {
        invalidCarID = {
          carID: "10",
        };
        emptyCarID = {
          carID: "",
        };
      });
      it("carID required", () => {
        return request("localhost:5000/api")
          .post(`/card`)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("carID is required");
          });
      });

      it("carID empty", () => {
        return request("localhost:5000/api")
          .post(`/card`)
          .send(emptyCarID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("carID cannot be an empty");
          });
      });

      it("carID invalid", () => {
        return request("localhost:5000/api")
          .post(`/card`)
          .send(invalidCarID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Invalid car ID");
          });
      });
    });

    describe("Car not registered", () => {
      let carIDNotExists = {};
      beforeEach(() => {
        carIDNotExists = {
          carID: "60cd210db01e666f0030caf1",
        };
      });
      it("carID not exists", () => {
        return request("localhost:5000/api")
          .post(`/card/`)
          .send(carIDNotExists)
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
      let cardInfo = {};
      beforeEach(() => {
        cardInfo = {
          carID: "60cde307f1c4c74150930754",
        };
      });
      it("carID exists", () => {
        return request("localhost:5000/api")
          .post(`/card`)
          .send(cardInfo)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).be.a("object");
          });
      });
    });
  });
});

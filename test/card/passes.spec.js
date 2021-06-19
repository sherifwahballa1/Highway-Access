const chai = require("chai");
const faker = require("faker");
const { beforeEach } = require("mocha");
const { expect, should } = chai;
require("mocha");
const request = require("supertest");

describe("Testing passes through id POST api/card/:carID", () => {
  describe("Update Validation Schema", () => {
    describe("Car carID Validation", () => {
      let invalidCarID;
      beforeEach(() => {
        invalidCarID = 10;
      });
      it("carID invalid", () => {
        return request("localhost:5000/api")
          .post(`/card/${invalidCarID}`)
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
      let carID;
      beforeEach(() => {
        carID = "60cd210db01e666f0030caf1";
      });
      it("carID not exists", () => {
        return request("localhost:5000/api")
          .post(`/card/${carID}`)
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("There's not exists car with this id");
          });
      });
    });

    describe("car without registered card", () => {
      let carID;
      beforeEach(() => {
        carID = "60cd29c197eaef55e8ca1934";
      });
      it("card not exists", () => {
        return request("localhost:5000/api")
          .post(`/card/${carID}`)
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("There's not exist card access for this car");
          });
      });
    });

    describe("car with registered card", () => {
      let carID;
      let carID_with_invalid_balance;
      let balance = 0;
      beforeEach(() => {
        carID = "60cde307f1c4c74150930754";
        carID_with_invalid_balance = "60cd210db01e666f0030caff";
      });
      it("card balance not enough", () => {
        return request("localhost:5000/api")
          .post(`/card/${carID_with_invalid_balance}`)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Your card balance not enough please charge it");
          });
      });

      it("card with enough balance", () => {
        return request("localhost:5000/api")
          .post(`/card/${carID}`)
          .then((response) => {
            balance = response.body.balance;
            expect(response.status).to.equal(200);
            expect(response.body).be.a("object").to.have.property("balance");
          });
      });

      it("second time in the same minute free without charge", () => {
        return request("localhost:5000/api")
          .post(`/card/${carID}`)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body)
              .be.a("object")
              .to.have.property("balance")
              .to.equal(balance);
          });
      });
    });
  });
});

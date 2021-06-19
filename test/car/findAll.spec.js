const chai = require("chai");
const faker = require("faker");
const { beforeEach } = require("mocha");
const { expect, should } = chai;
require("mocha");
const request = require("supertest");

describe("Testing get all car by id GET api/car", () => {
  describe("Update Validation Schema", () => {
    describe("Car pagination inputs Validation", () => {
      it("without pagination inputs", () => {
        return request("localhost:5000/api")
          .get(`/car?pageNo=''&limit=10`)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body).be.a("object").to.have.property("message");
          });
      });

      it("pagination inputs invalid", () => {
        return request("localhost:5000/api")
          .get(`/car?pageNo&limit`)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body).be.a("object").to.have.property("message");
          });
      });

      it("pagination inputs valid", () => {
        return request("localhost:5000/api")
          .get(`/car?pageNo=0&limit=10`)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).be.a("object")
          });
      });
    });
  });
});

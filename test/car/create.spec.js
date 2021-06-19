const chai = require("chai");
const faker = require("faker");
const { beforeEach } = require("mocha");
const { expect, should } = chai;
require("mocha");
const request = require("supertest");

describe("Testing Create car POST api/car", () => {
  describe("Create Validation Schema", () => {
    car_Data_Without_EmployeeID = {};
    car_data_with_empty_EmployeeID = {};
    car_Data_With_Invalid_EmployeeID = {};
    beforeEach(() => {
      car_Data_Without_EmployeeID = {
        brand: faker.name.title().split(" ")[0],
        model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
        plateNo:
          faker.name.firstName().split(" ")[0] +
          " " +
          faker.datatype.number({ min: 0, max: 100 }),
      };

      car_data_with_empty_EmployeeID = {
        brand: faker.name.title().split(" ")[0],
        model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
        plateNo:
          faker.name.firstName().split(" ")[0] +
          " " +
          faker.datatype.number({ min: 0, max: 100 }),
        employeeID: "",
      };

      car_Data_With_Invalid_EmployeeID = {
        model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
        brand: faker.name.title().split(" ")[0],
        plateNo:
          faker.name.firstName().split(" ")[0] +
          " " +
          faker.datatype.number({ min: 0, max: 100 }),
        employeeID: faker.address.latitude().toString(),
      };
    });

    describe("Car employeeID Validation", () => {
      it("employeeID Required", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_Without_EmployeeID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("employeeID is required");
          });
      });

      it("employeeID is empty filed", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_data_with_empty_EmployeeID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("employeeID cannot be an empty");
          });
      });

      it("invalid employeeID", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_With_Invalid_EmployeeID)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("Invalid employee ID");
          });
      });
    });

    describe("Car brand Validation", () => {
      car_Data_Without_brand = {};
      car_data_with_empty_brand = {};
      car_Data_With_Invalid_brand = {};
      beforeEach(() => {
        car_Data_Without_brand = {
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          plateNo:
            faker.name.findName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
          employeeID: require("mongoose").Types.ObjectId(),
        };

        car_data_with_empty_brand = {
          brand: "",
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          plateNo:
            faker.name.findName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
          employeeID: require("mongoose").Types.ObjectId(),
        };

        car_Data_With_Invalid_brand = {
          brand: faker.name.title().split(" ")[0] + "&*",
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          plateNo:
            faker.name.findName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
          employeeID: require("mongoose").Types.ObjectId(),
        };
      });

      it("Car brand Required", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_Without_brand)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("brand name is required");
          });
      });

      it("Car brand empty", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_data_with_empty_brand)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("brand name cannot be an empty");
          });
      });

      it("Car brand invalid", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_With_Invalid_brand)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("brand name must be consists of letters only");
          });
      });
    });

    describe("Car model Validation", () => {
      car_Data_Without_model = {};
      car_data_with_empty_model = {};
      car_Data_With_Invalid_model = {};
      beforeEach(() => {
        car_Data_Without_model = {
          brand: faker.name.title().split(" ")[0],
          plateNo:
            faker.name.findName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
          employeeID: require("mongoose").Types.ObjectId(),
        };

        car_data_with_empty_model = {
          brand: faker.name.title().split(" ")[0],
          model: "",
          plateNo:
            faker.name.findName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
          employeeID: require("mongoose").Types.ObjectId(),
        };

        car_Data_With_Invalid_model = {
          brand: faker.name.title().split(" ")[0],
          model: "55",
          plateNo:
            faker.name.findName().split(" ")[0] +
            " " +
            faker.datatype.number({ min: 0, max: 100 }),
          employeeID: require("mongoose").Types.ObjectId(),
        };
      });

      it("Car model Required", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_Without_model)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("model is required");
          });
      });

      it("Car model is empty field", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_data_with_empty_model)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("model cannot be an empty");
          });
      });

      it("Car model is invalid", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_With_Invalid_model)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal(
                "model must be consists of numbers and valid year from 1900 : 2099"
              );
          });
      });
    });

    describe("Car plate number Validation", () => {
      car_Data_Without_plateNo = {};
      car_data_with_empty_plateNo = {};
      car_Data_With_Invalid_plateNo = {};
      beforeEach(() => {
        car_Data_Without_plateNo = {
          brand: faker.name.title().split(" ")[0],
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          employeeID: require("mongoose").Types.ObjectId(),
        };

        car_data_with_empty_plateNo = {
          brand: faker.name.title().split(" ")[0],
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          plateNo: "",
          employeeID: require("mongoose").Types.ObjectId(),
        };

        car_Data_With_Invalid_plateNo = {
          brand: faker.name.title().split(" ")[0],
          model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
          plateNo: "^%^",
          employeeID: require("mongoose").Types.ObjectId(),
        };
      });

      it("Car plate number Required", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_Without_plateNo)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("plate number is required");
          });
      });

      it("Car plate number is emplty field", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_data_with_empty_plateNo)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("plate number cannot be an empty");
          });
      });

      it("Car plate number is invalid", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(car_Data_With_Invalid_plateNo)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal(
                "plate number must be consists of letters and numbers only"
              );
          });
      });
    });
  });

  describe("Valid inputes", () => {
    valid_car_info_employee_not_exists = {};
    valid_car_registered_before = {};
    valid_car_info = {};
    beforeEach(() => {
      valid_car_info_employee_not_exists = {
        brand: faker.name.title().split(" ")[0],
        model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
        plateNo:
          faker.name.findName().split(" ")[0] +
          " " +
          faker.datatype.number({ min: 0, max: 100 }),
        employeeID: require("mongoose").Types.ObjectId(),
      };

      valid_car_registered_before = {
        brand: faker.name.title().split(" ")[0],
        model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
        plateNo: "lts 75",
        employeeID: "60ccb2d072479dac7c57af10",
      };

      valid_car_info = {
        brand: faker.name.title().split(" ")[0],
        model: faker.datatype.number({ min: 1950, max: 2099 }).toString(),
        plateNo:
          faker.name.findName().split(" ")[0] +
          " " +
          faker.datatype.number({ min: 0, max: 100 }),
        employeeID: "60ccb2d072479dac7c57af10",
      };
    });

    describe("Employee not registered", () => {
      it("employeeID not exists", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(valid_car_info_employee_not_exists)
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .to.have.property("message")
              .to.equal("There's not exists employee with this id");
          });
      });
    });

    describe("Car registered before", () => {
      it("car plate numer exists", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(valid_car_registered_before)
          .then((response) => {
            expect(response.status).to.equal(409);
            expect(response.body)
              .to.have.property("message")
              .to.equal("Car plate number registered before");
          });
      });
    });

    describe("Car register successfully", () => {
      it("register a new car", () => {
        return request("localhost:5000/api")
          .post("/car")
          .send(valid_car_info)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an.instanceof(Object).and.to.have
              .property('_id');
          });
      });
    });
    
  });
});

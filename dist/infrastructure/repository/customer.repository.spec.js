"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const customer_model_1 = __importDefault(require("./db/sequelize/model/customer.model"));
const customer_repository_1 = __importDefault(require("./customer.repository"));
const address_1 = __importDefault(require("../../domain/entity/address"));
describe("Customer repository test", () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([customer_model_1.default]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it("should create a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("Street 1", 1, "ZipCode 1", "City 1");
        customer.Address = address;
        yield customerRepository.create(customer);
        const customerModel = yield customer_model_1.default.findOne({ where: { id: "1" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
    }));
    it("should update a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("Street 1", 1, "ZipCode 1", "City 1");
        customer.Address = address;
        yield customerRepository.create(customer);
        customer.changeName("Customer  2");
        yield customerRepository.update(customer);
        const customerModel = yield customer_model_1.default.findOne({ where: { id: "1" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
    }));
    it("should find a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("Street 1", 1, "ZipCode 1", "City 1");
        customer.Address = address;
        yield customerRepository.create(customer);
        const customerResult = yield customerRepository.find(customer.id);
        expect(customer).toStrictEqual(customerResult);
    }));
    it("should throw an error when the customer is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield customerRepository.find("456ABC");
        })).rejects.toThrow("Customer not found");
    }));
    it("should find all customers", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer1 = new customer_1.default("123", "Customer 1");
        const address1 = new address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer1.Address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();
        const customer2 = new customer_1.default("456", "Customer 2");
        const address2 = new address_1.default("Street 2", 2, "Zipcode 2", "City 2");
        customer2.Address = address2;
        customer2.addRewardPoints(20);
        yield customerRepository.create(customer1);
        yield customerRepository.create(customer2);
        const customers = yield customerRepository.findAll();
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    }));
});

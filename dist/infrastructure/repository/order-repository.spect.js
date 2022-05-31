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
const order_1 = __importDefault(require("../../domain/entity/order"));
const order_item_1 = __importDefault(require("../../domain/entity/order_item"));
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const address_1 = __importDefault(require("../../domain/entity/address"));
const product_1 = __importDefault(require("../../domain/entity/product"));
const customer_model_1 = __importDefault(require("./db/sequelize/model/customer.model"));
const customer_repository_1 = __importDefault(require("./customer.repository"));
const product_model_1 = __importDefault(require("./db/sequelize/model/product.model"));
const product_repository_1 = __importDefault(require("./product.repository"));
const order_item_model_1 = __importDefault(require("./db/sequelize/model/order-item.model"));
const order_model_1 = __importDefault(require("./db/sequelize/model/order.model"));
const order_repository_1 = __importDefault(require("./order.repository"));
describe("Order repository test", () => {
    let sequelize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        yield sequelize.addModels([
            customer_model_1.default,
            order_model_1.default,
            order_item_model_1.default,
            product_model_1.default,
        ]);
        yield sequelize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    it("should create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "Customer 1");
        const address = new address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("123", "Product 1", 10);
        yield productRepository.create(product);
        const ordemItem = new order_item_1.default("1", product.name, product.price, product.id, 2);
        const order = new order_1.default("123", "123", [ordemItem]);
        const orderRepository = new order_repository_1.default();
        yield orderRepository.create(order);
        const orderModel = yield order_model_1.default.findOne({
            where: { id: order.id },
            include: ["items"],
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    price: ordemItem.price,
                    quantity: ordemItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    }));
});

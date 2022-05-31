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
const order_1 = __importDefault(require("../../domain/entity/order"));
const order_item_model_1 = __importDefault(require("../repository/db/sequelize/model/order-item.model"));
const order_model_1 = __importDefault(require("../repository/db/sequelize/model/order.model"));
const customer_1 = __importDefault(require("../../domain/entity/customer"));
const address_1 = __importDefault(require("../../domain/entity/address"));
const product_1 = __importDefault(require("../../domain/entity/product"));
const order_item_1 = __importDefault(require("../../domain/entity/order_item"));
const customer_model_1 = __importDefault(require("./db/sequelize/model/customer.model"));
const product_model_1 = __importDefault(require("./db/sequelize/model/product.model"));
class OrderRepository {
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield order_model_1.default.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            }, {
                include: [{ model: order_item_model_1.default }],
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield order_model_1.default.update({
                    id: entity.id,
                    customer_id: entity.customerId,
                    total: entity.total(),
                    items: entity.items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                    })),
                }, {
                    where: {
                        id: entity.id
                    }
                });
            }
            catch (error) {
                throw new Error("Order not found");
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let orderModel;
            try {
                orderModel = yield order_model_1.default.findOne({
                    where: {
                        id: id,
                    },
                    include: [{
                            model: customer_model_1.default
                        },
                        {
                            model: order_item_model_1.default,
                            include: [product_model_1.default]
                        }],
                    rejectOnEmpty: true,
                });
            }
            catch (error) {
                throw new Error("Order not found");
            }
            const customer = new customer_1.default(orderModel.customer.id, orderModel.customer.name);
            const address = new address_1.default(orderModel.customer.street, orderModel.customer.number, orderModel.customer.zipcode, orderModel.customer.city);
            customer.changeAddress(address);
            const ordemItems = orderModel.items.map(item => {
                return new order_item_1.default(item.id, item.product.name, item.product.price, item.product.id, item.quantity);
            });
            const order = new order_1.default(id, orderModel.customer_id, ordemItems);
            return order;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let orderModels;
            try {
                orderModels = yield order_model_1.default.findAll({
                    include: [
                        {
                            model: order_item_model_1.default,
                            include: [product_model_1.default]
                        }
                    ]
                });
            }
            catch (error) {
                throw new Error("No orders found");
            }
            const orders = orderModels.map(orderModel => {
                const items = orderModel.items.map(item => {
                    const product = new product_1.default(item.product.id, item.product.name, item.product.price);
                    return new order_item_1.default(item.id, product.name, product.price, product.id, item.quantity);
                });
                return new order_1.default(orderModel.id, orderModel.customer_id, items);
            });
            return orders;
        });
    }
}
exports.default = OrderRepository;

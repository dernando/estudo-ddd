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
const product_1 = __importDefault(require("../../domain/entity/product"));
const product_model_1 = __importDefault(require("./db/sequelize/model/product.model"));
class ProductRepository {
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_model_1.default.create({
                id: entity.id,
                name: entity.name,
                price: entity.price
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_model_1.default.update({
                name: entity.name,
                price: entity.price
            }, {
                where: {
                    id: entity.id
                }
            });
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productModel = yield product_model_1.default.findOne({ where: { id: id } });
            return new product_1.default(productModel.id, productModel.name, productModel.price);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const productModels = yield product_model_1.default.findAll();
            return productModels.map((productModel) => new product_1.default(productModel.id, productModel.name, productModel.price));
        });
    }
}
exports.default = ProductRepository;

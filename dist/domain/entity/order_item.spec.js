"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_item_1 = __importDefault(require("./order_item"));
describe("Order Unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new order_item_1.default("", "item 1", 100, "p1", 0);
        }).toThrowError("Id is required");
    });
});

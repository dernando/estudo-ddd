"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, _productId, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = _productId;
        this._quantity = quantity;
        this.validate();
    }
    validate() {
        if (!this._id) {
            throw new Error("Id is required");
        }
        return true;
    }
    get price() {
        return this._price * this._quantity;
    }
    get quantity() {
        return this._quantity;
    }
}
exports.default = OrderItem;

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
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price * this._quantity;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(quantity) {
        this._quantity = quantity;
    }
    get productId() {
        return this._productId;
    }
}
exports.default = OrderItem;

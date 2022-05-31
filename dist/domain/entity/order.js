"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, _customerId, items) {
        this._items = [];
        this._id = id;
        this._customerId = _customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    get id() {
        return this._id;
    }
    get customerId() {
        return this._customerId;
    }
    get items() {
        return this._items;
    }
    total() {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
    changeCustomer(customerId) {
        this._customerId = customerId;
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items are required");
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be less or equal zero");
        }
        return true;
    }
}
exports.default = Order;

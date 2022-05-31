"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._rewardsPoints = 0;
        this._id = id;
        this._name = name;
        this.validate();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get rewardPoints() {
        return this._rewardsPoints;
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }
    changeName(name) {
        this._name = name;
    }
    activate() {
        if (!this._address) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }
    isActive() {
        return this._active;
    }
    deactivate() {
        this._active = false;
    }
    addRewardPoints(points) {
        this._rewardsPoints += points;
    }
    get Address() {
        return this._address;
    }
    set Address(address) {
        this._address = address;
    }
}
exports.default = Customer;

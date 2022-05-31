export default class OrderItem {

    private _id: string;
    private _name: string;
    private _price: number;
    private _productId: string;
    private _quantity: number;

    constructor(id: string, name: string, price: number, _productId: string, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = _productId;
        this._quantity = quantity;
        this.validate();
    }

    validate(): boolean {

        if(!this._id) {
            throw new Error("Id is required");
        }

        return true;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price * this._quantity;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(quantity: number) {
        this._quantity = quantity;
    }

    get productId(): string {
        return this._productId;
    }


}
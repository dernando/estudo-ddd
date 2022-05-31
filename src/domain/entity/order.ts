import OrderItem from "./order_item";
import Product from "./product";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;


    constructor(id: string, _customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = _customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

    changeCustomer(customerId: string) {
        this._customerId = customerId;
    }

    validate(): boolean {
        if(this._id.length === 0) {
            throw new Error("Id is required");
        }
        if(this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }

        if(this._items.length === 0) {
            throw new Error("Items are required");
        }

        if(this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be less or equal zero");    
        }

        return true;
    }
}
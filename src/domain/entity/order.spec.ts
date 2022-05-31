import Order from "./order";
import OrderItem from "./order_item";

describe("Order Unit tests", () => {

    it("should throw error when name is empty", () => {
      
        expect(() => {
            let order =  new Order("", "123", []);
        }).toThrowError("Id is required");

    }); 
    
    it("should throw error when customerID is empty", () => {
      
        expect(() => {
            let order =  new Order("123", "", []);
        }).toThrowError("CustomerId is required");

    });

    it("should throw error when customerID is empty", () => {
      
        expect(() => {
            let order =  new Order("123", "123", []);
        }).toThrowError("Items are required");

    });

    it("should calculate total", () => {
      
        const item = new OrderItem("i1", "item 1", 100, "p1", 2);

        const order = new Order("oi1", "c1", [item]);

        let total = order.total();

        expect(total).toBe(200);

        const item2 = new OrderItem("i2", "item 2", 200, "p2", 2);

        const order2 = new Order("oi1", "c1", [item, item2]);

        total = order2.total();

        expect(total).toBe(600);

    });

    it("should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "item 1", 100, "p1", 0);
            const order = new Order("oi1", "c1", [item]);
        }).toThrowError("Quantity must be less or equal zero");
    });
    
});
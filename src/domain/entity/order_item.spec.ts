import Order from "./order";
import OrderItem from "./order_item";

describe("Order Unit tests", () => {

    it("should throw error when id is empty", () => {
      
        expect(() => {
            let order =  new OrderItem("", "item 1", 100, "p1", 0);
        }).toThrowError("Id is required");

    });
    
});
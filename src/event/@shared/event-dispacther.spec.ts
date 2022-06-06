import Address from "../../domain/entity/address";
import CustomerChangedAddressEvent from "../customer/customer-changed-address-event";
import CustomerCreatedEvent from "../customer/customer-create.event";
import SendConsoleLogHandler from "../customer/handler/send-console-when-customer-address-is-changed.handler";
import SendConsoleLog1Handler from "../customer/handler/send-console-when-customer-is-created.handler";
import SendConsoleLog2Handler from "../customer/handler/send-console2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-create.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            1
        );

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
          0
        );
      });

      it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    
        eventDispatcher.unregisterAll();
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();
      });

      it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    
        const productCreatedEvent = new ProductCreatedEvent({
          name: "Product 1",
          description: "Product 1 description",
          price: 10.0,
        });
    
        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
    
        expect(spyEventHandler).toHaveBeenCalled();
      });

      it("should register two customer created event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    
        const customerCreatedEvent = new CustomerCreatedEvent({
          id: 1,
          name: "Customer"
        });
        
        eventDispatcher.notify(customerCreatedEvent);
    
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
            2
        );

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        expect(
          eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);

      const eventHandler3 = new SendConsoleLogHandler();
      const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

      eventDispatcher.register("CustomerChangedAddressEvent", eventHandler3);

      const customerChangedAddressEvent = new CustomerChangedAddressEvent({
        id: "1",
        name: "Customer 1",
        address: new Address("Address 1", 100, "00001-000", "SP")
      });

      eventDispatcher.notify(customerChangedAddressEvent);

      expect(spyEventHandler3).toHaveBeenCalled();

      expect(
        eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
      ).toMatchObject(eventHandler3);

    });

});
import EventHandlerInterface from "../../@shared/event.handler.interface";
import eventInterface from "../../@shared/event.interface";

export default class SendConsoleLog2Handler implements EventHandlerInterface {
    handle(event: eventInterface): void {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}
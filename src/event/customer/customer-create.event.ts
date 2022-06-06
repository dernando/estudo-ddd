import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurred = new Date(eventData);
        this.eventData = eventData;
    }
}
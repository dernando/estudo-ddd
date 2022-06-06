import EventInterface from "../@shared/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurred = new Date();
        this.eventData = eventData;
    }
}
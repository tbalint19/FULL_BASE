import {Injectable} from "@angular/core";
import {OrderDay} from "../model/backend/calendar/order-day";
import {Slot} from "../model/backend/calendar/slot";
import {Event} from "../model/backend/calendar/event";


@Injectable()
export class CalendarStatus {

  public allExistingEvents: Event[];

  public upcomingOrderDays: OrderDay[];

  public selectedEvent: Event;

  public selectedOrderDay: OrderDay;

  public selectedSlot: Slot;

  constructor(){
    this.allExistingEvents = [];
    this.upcomingOrderDays = [];
  }
}

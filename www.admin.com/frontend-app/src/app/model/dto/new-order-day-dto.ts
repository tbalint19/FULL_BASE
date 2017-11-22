import {OrderDay} from "../backend/calendar/order-day";
import {Event} from "../backend/calendar/event";
import {Slot} from "../backend/calendar/slot";

export class NewOrderDayDTO {

  public orderDay: OrderDay;

  public events: Event[];

  public slots: Slot[];

  constructor(){}

}

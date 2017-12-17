import {Injectable} from "@angular/core";
import {Addition} from "../model/backend/calendar/addition";
import {Holiday} from "../model/backend/calendar/holiday";
import {Restriction} from "../model/backend/calendar/restriction";
import {Reservation} from "../model/backend/calendar/reservation";
import {Slot} from "../model/slot";
import {MainMessage} from "../model/backend/info/main-message";


@Injectable()
export class CalendarStatus {

  public message: MainMessage;

  public events: string[];
  public additions: Addition[];
  public holidays: Holiday[];
  public restrictions: Restriction[];
  public reservations: Reservation[];

  public ownReservations: Reservation[];

  public selectedEvent: string;
  public selectedDay: Date;
  public selectedSlot: Slot;

  public editorOpened: boolean;

  constructor(){
    this.events = ["Oltás", "Általános vizsgálat"]
    this.selectedEvent = null;
    this.selectedDay = null;
    this.selectedSlot = null;
  }

  showEventSelect(): boolean {
    return this.selectedEvent == null;
  }

  showDaySelect(): boolean {
    return this.selectedEvent != null && this.selectedDay == null;
  }

  showSlotSelect(): boolean {
    return this.selectedEvent != null && this.selectedDay != null && this.selectedSlot == null;
  }

  showCreateButton(): boolean {
    return this.selectedEvent != null && this.selectedDay != null && this.selectedSlot != null;
  }

}

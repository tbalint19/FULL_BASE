import {Injectable} from "@angular/core";
import {Addition} from "../model/backend/calendar/addition";
import {Holiday} from "../model/backend/calendar/holiday";
import {Restriction} from "../model/backend/calendar/restriction";
import {Reservation} from "../model/backend/calendar/reservation";
import {Slot} from "../model/slot";
import {MainMessage} from "../model/backend/info/main-message";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {Month} from "../model/month";
import {Day} from "../model/day";


@Injectable()
export class CalendarStatus {

  public message: MainMessage;

  public events: string[];

  public ownReservations: Reservation[];

  public selectedEvent: string;
  public selectedDay: Day;
  public selectedSlot: Slot;
  public childName: string;

  public editorOpened: boolean;

  private pending: boolean;

  public month: Month;

  constructor(
    private requestObserver: HttpClient,
    private factory: RequestFactory){
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

  showChildName(): boolean {
    return this.selectedEvent != null && this.selectedDay != null && this.selectedSlot != null;
  }

  showCreateButton(): boolean {
    return this.selectedEvent != null && this.selectedDay != null && this.selectedSlot != null;
  }

  isDisabled(): boolean {
      return !this.childName || (this.childName && this.childName.length < 3);
  }

  setPending(bool: boolean): void {
      this.pending = bool;
  }

  isPending(): boolean {
    return this.pending;
  }
}

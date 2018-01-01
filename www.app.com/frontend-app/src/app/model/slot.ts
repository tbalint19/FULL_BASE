import {Reservation} from "./backend/calendar/reservation";

export class Slot {

  public date: Date;

  public reservation: Reservation;

  public reservableFor: string[];

  constructor(date: Date) {
    this.date = date;
  }
}

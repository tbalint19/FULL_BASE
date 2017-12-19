import {Reservation} from "./backend/calendar/reservation";

export class Slot {

  public start: Date;

  public relatedReservation: Reservation;

  public isVaccinateTime: boolean;

  constructor(start: Date, isVaccinateTime: boolean) {
    this.relatedReservation = null;
    this.start = start;
    this.isVaccinateTime = isVaccinateTime;
  }
}

import {ApplicationUser} from "../auth/application-user";

export class Reservation {

  public id: number;
  public user: ApplicationUser;
  public event: string;
  public date: Date;

  constructor(event, date) {
    this.event = event;
    this.date = date;
  }
}

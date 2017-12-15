import {ApplicationUser} from "../auth/application-user";

export class Reservation {

  public id: number;
  public user: ApplicationUser;
  public event: string;
  public date: Date;

  constructor(user, event, date) {
    this.user = user;
    this.event = event;
    this.date = date;
  }
}

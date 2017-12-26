import {ApplicationUser} from "../auth/application-user";

export class Reservation {

  public id: number;
  public user: ApplicationUser;
  public event: string;
  public date: Date;
  public childName: string;

  constructor(event, date, childName) {
    this.event = event;
    this.date = date;
    this.childName = childName;
  }
}

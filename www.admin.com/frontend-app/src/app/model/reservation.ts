import {User} from "./user";
import {Slot} from "./slot";

export class Reservation {

  public id: number;
  public user: User;
  public slot: Slot;
  public event: Event;
}

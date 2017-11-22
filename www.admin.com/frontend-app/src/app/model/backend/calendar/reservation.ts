import {User} from "../../user";
import {Slot} from "./slot";
import {ApplicationUser} from "../auth/application-user";

export class Reservation {

  public id: number;
  public user: ApplicationUser;
  public slot: Slot;
  public event: Event;
}

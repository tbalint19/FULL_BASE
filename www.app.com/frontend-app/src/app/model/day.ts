import {Slot} from "./slot";
import {Restriction} from "./backend/calendar/restriction";
import {Holiday} from "./backend/calendar/holiday";
import {Addition} from "./backend/calendar/addition";

export class Day {

  public date: Date;

  public restriction: Restriction;

  public holiday: Holiday;

  public addition: Addition;

  public slots: Slot[];

}

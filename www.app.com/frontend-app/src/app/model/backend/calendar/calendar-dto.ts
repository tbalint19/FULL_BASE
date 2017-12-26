import {Addition} from "./addition";
import {Holiday} from "./holiday";
import {Restriction} from "./restriction";
import {Reservation} from "./reservation";

export class CalendarDto {

  public additions: Addition[];

  public holidays: Holiday[];

  public restrictions: Restriction[];

  public reservations: Reservation[];

  public ownReservations: Reservation[];

}

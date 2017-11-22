import {Reservation} from "./backend/calendar/reservation";

export class User {

  public id: number;
  public username: string;
  public reservations: Reservation[];
}

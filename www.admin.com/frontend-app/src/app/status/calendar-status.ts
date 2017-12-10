import {Injectable} from "@angular/core";
import {Reservation} from "../model/backend/calendar/reservation";
import {HttpClient} from "../http/http.client";
import {DtoFactory} from "../factory/dto-factory";
import {ParamFactory} from "../factory/param-factory";
import {Addition} from "../model/backend/calendar/addition";
import {Restriction} from "../model/backend/calendar/restriction";
import {Holiday} from "../model/backend/calendar/holiday";
import {ApplicationUser} from "../model/backend/auth/application-user";

@Injectable()
export class CalendarStatus {

  public selectedMonday: Date;
  public selectedDay: Date;

  public selectedDaysReservations: Reservation[];

  public additionsOfTheWeek: Addition[];
  public restrictionsOfTheWeek: Restriction[];
  public holidaysOfTheWeek: Holiday[];
  public reservationsOfTheWeek: Reservation[];

  public users: ApplicationUser[];
  public selectedUser: ApplicationUser;
  public selectedEvent: string;
  public selectedQuarter: Date;

  public selectedReservation: Reservation;
  public reservationEditorOpened: boolean;

  public events: string[];

  constructor(
    private _requestObserver: HttpClient,
    private _dtoFactory: DtoFactory,
    private _paramFactory: ParamFactory){
    this.selectedDaysReservations = [];
    this.reservationsOfTheWeek = [];
    this.restrictionsOfTheWeek = [];
    this.additionsOfTheWeek = [];
    this.holidaysOfTheWeek = [];
    this.selectedMonday = null;
    this.selectedDay = null;
    this.selectedUser = null;
    this.selectedEvent = null;
    this.selectedReservation = null;
    this.events = ["Általános vizsgálat", "Oltás", "Szünet"];
  }

  public week(): Date[] {
    let week = [];
    for (let x=0; x<7; x++){
      let day = new Date();
      day.setTime(this.selectedMonday.getTime() + 1000*60*60*24*x);
      week.push(day);
    }
    return week;
  }

  public quarters(day: Date): Date[] {
    let quarters = [];
    let morning8 = new Date();
    morning8.setTime(day.getTime());
    morning8.setHours(10, 0, 0);
    for (let x=0; x<32; x++) {
      let timeStamp = new Date();
      timeStamp.setTime(morning8.getTime());
      timeStamp.setHours(morning8.getHours());
      timeStamp.setMinutes(morning8.getMinutes() + x*15);
      quarters.push(timeStamp);
    }
    return quarters;
  }

}

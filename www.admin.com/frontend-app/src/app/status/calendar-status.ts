import {Injectable} from "@angular/core";
import {Reservation} from "../model/backend/calendar/reservation";
import {HttpClient} from "../http/http.client";
import {DtoFactory} from "../factory/dto-factory";
import {ParamFactory} from "../factory/param-factory";
import {Addition} from "../model/backend/calendar/addition";
import {Restriction} from "../model/backend/calendar/restriction";
import {Holiday} from "../model/backend/calendar/holiday";
import {ApplicationUser} from "../model/backend/auth/application-user";
import {Schema} from "../model/schema";
import {DayInfo} from "../model/day-info";

@Injectable()
export class CalendarStatus {

  public selectedMonday: Date;
  public selectedDay: Date;

  public schema: Schema;

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
    private _paramFactory: ParamFactory)
  {
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

  public quarters(day: Date, dayInfo: DayInfo): Date[] {
    let quarters = [];
    let start = new Date();
    start.setTime(day.getTime());
    start.setHours(dayInfo.start, 0, 0);
    for (let x=0; x<dayInfo.length; x++) {
      let timeStamp = new Date();
      timeStamp.setTime(start.getTime());
      timeStamp.setHours(start.getHours());
      timeStamp.setMinutes(start.getMinutes() + x*15);
      quarters.push(timeStamp);
    }
    return quarters;
  }

  public start(day: Date): number {
    return
  }

  public getCurrentSchema(): any {
    this.schema = new Schema(this.weekIsOdd());
  }

  public weekIsOdd(): boolean {
    return this.getWeekNumber(this.selectedMonday) % 2 == 0;
  }

  public getWeekNumber(date: Date): number {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7);
  }

}

import {Injectable, OnInit} from "@angular/core";
import {Reservation} from "../model/backend/calendar/reservation";
import {HttpClient} from "../http/http.client";
import {DtoFactory} from "../factory/dto-factory";
import {ParamFactory} from "../factory/param-factory";
import {Addition} from "../model/backend/calendar/addition";
import {Restriction} from "../model/backend/calendar/restriction";
import {Holiday} from "../model/backend/calendar/holiday";
import {ApplicationUser} from "../model/backend/auth/application-user";
import {WeeklyData} from "../model/weekly-data";
import {DayInfo} from "../model/day-info";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Slot} from "../model/slot";
import {DaySchema} from "../model/day-schema";

@Injectable()
export class CalendarStatus {

  public users: ApplicationUser[];
  public events: string[];
  public weeklyData: BehaviorSubject<WeeklyData>;

  public selectedMonday: BehaviorSubject<Date>;
  public selectedDay: BehaviorSubject<Date>;

  public editedReservation: Reservation;

  public selectedSchema: DaySchema;

  constructor(
    private _requestObserver: HttpClient,
    private _dtoFactory: DtoFactory,
    private _paramFactory: ParamFactory)
  {
    this.selectedDay = new BehaviorSubject(new Date());
    this.selectedDay.subscribe(
      (day: Date) => this.getPreviousMonday(day));
    this.selectedMonday.subscribe(
      (day: Date) => this.updateWeeklyData(day));
    this.events = ["Általános vizsgálat", "Oltás", "Szünet"];
  }

  disabledNewReservation(): boolean {
    return this.editedReservation.event == null;
  }

  disabledNewAddition(): boolean {
    return this.selectedSchema == null;
  }

  private getPreviousMonday(day: Date): void {
    let prevMonday = new Date(day.getTime());
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
    prevMonday.setHours(0, 0, 0);
    if (!this.selectedMonday){
      this.selectedMonday = new BehaviorSubject(prevMonday);
    } else if (prevMonday.getDate() != this.selectedMonday.getValue().getDate()) {
      this.selectedMonday.next(prevMonday);
    }
  }

  private updateWeeklyData(monday: Date): void {
    if (!this.weeklyData){
      this.weeklyData = new BehaviorSubject(new WeeklyData(monday));
    } else {
      this.weeklyData.next(new WeeklyData(monday));
    }
  }

}

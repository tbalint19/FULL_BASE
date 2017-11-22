import {Injectable} from "@angular/core";
import {OrderDay} from "../model/backend/calendar/order-day";
import {CalendarService} from "../service/calendar.service";
import {EventCreatorDtoCreator} from "../model/creator/event-creator-dto-creator";
import {NewOrderDayDTO} from "../model/dto/new-order-day-dto";
import {Slot} from "../model/backend/calendar/slot";
import {Event} from "../model/backend/calendar/event";
import {Reservation} from "../model/backend/calendar/reservation";
import {OrderDayDtoCreator} from "../model/creator/order-day-dto-creator";
import {ReservationDtoCreator} from "../model/creator/reservation-dto-creator";
import {HttpClient} from "../http/http.client";
import {DtoFactory} from "../factory/dto-factory";
import {ParamFactory} from "../factory/param-factory";

@Injectable()
export class CalendarStatus {

  public selectedMonday: Date;
  public selectedDay: Date;

  public orderDaysOfTheWeek: OrderDay[];
  public allExistingEvents: Event[];
  public selectedDaysSlots: Slot[];
  public selectedDaysReservations: Reservation[];

  public eventCreator: EventCreatorDtoCreator;
  public orderDayCreator: OrderDayDtoCreator;
  public reservationCreator: ReservationDtoCreator;

  constructor(
    private _requestObserver: HttpClient,
    private _dtoFactory: DtoFactory,
    private _paramFactory: ParamFactory){
    this.orderDaysOfTheWeek = [];
    this.allExistingEvents = [];
    this.selectedDaysSlots = [];
    this.selectedDaysReservations = [];
    this.selectedMonday = null;
    this.selectedDay = null;
    this.eventCreator = new EventCreatorDtoCreator();
    this.orderDayCreator = new OrderDayDtoCreator();
    this.reservationCreator = new ReservationDtoCreator();
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

  public quarters(): Date[] {
    let quarters = [];
    let morning8 = new Date();
    morning8.setTime(this.selectedDay.getTime());
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

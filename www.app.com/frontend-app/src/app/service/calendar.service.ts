import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {Observable} from "rxjs/Observable";
import {SuccessResponse} from "../model/response/success-response";
import {Holiday} from "../model/backend/calendar/holiday";
import {StartParams} from "../model/params/start-params";
import {Addition} from "../model/backend/calendar/addition";
import {Restriction} from "../model/backend/calendar/restriction";
import {Reservation} from "../model/backend/calendar/reservation";
import {Slot} from "../model/slot";
import {MainMessage} from "../model/backend/info/main-message";

@Injectable()
export class CalendarService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory) { }

  public getMessage(): Observable<MainMessage> {
    return this.client.transfer(
      this.requestFactory.createCalendarMessageRequest())
  }

  public getHolidays(): Observable<Holiday[]> {
    return this.client.transfer(
      this.requestFactory.createGetHolidaysRequest(
        new StartParams(new Date())));
  }

  public getAdditions(): Observable<Addition[]> {
    return this.client.transfer(
      this.requestFactory.createGetAdditionsRequest(
        new StartParams(new Date())));
  }

  public getRestrictions(): Observable<Restriction[]> {
    return this.client.transfer(
      this.requestFactory.createGetRestrictionsRequest(
        new StartParams(new Date())));
  }

  public getReservations(): Observable<Reservation[]> {
    return this.client.transfer(
      this.requestFactory.createGetReservationsRequest(
        new StartParams(new Date())));
  }

  public getMyReservations(): Observable<Reservation[]> {
    return this.client.transfer(
      this.requestFactory.createGetMyReservationsRequest());
  }

  public createReservation(event: string, slot: Slot): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createReservationRequest(
        new Reservation(event, slot.date)));
  }

  public deleteReservation(reservation: Reservation): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createDeleteReservationRequest(reservation));
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {DtoFactory} from "../factory/dto-factory";
import {RequestFactory} from "../factory/request-factory";
import {Observable} from "rxjs/Observable";
import {ParamFactory} from "../factory/param-factory";
import {SuccessResponse} from "../model/response/success-response";
import {Restriction} from "../model/backend/calendar/restriction";
import {Addition} from "../model/backend/calendar/addition";
import {Holiday} from "../model/backend/calendar/holiday";
import {Reservation} from "../model/backend/calendar/reservation";
import {ApplicationUser} from "../model/backend/auth/application-user";


@Injectable()
export class CalendarService {

  constructor(
    private _client: HttpClient,
    private _dtoFactory: DtoFactory,
    private _paramFactory: ParamFactory,
    private _requestFactory: RequestFactory) { }

  public getRestrictions(monday: number): Observable<Restriction[]> {
    return this._client.transfer(
      this._requestFactory.createGetRestrictionsRequest(
        this._paramFactory.createStartParams(monday)));
  }

  public addRestriction(day: Date): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createNewRestrictionRequest(
        new Restriction(day)));
  }

  public deleteRestriction(restriction: Restriction): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createDeleteRestrictionRequest(
        restriction));
  }

  public getAdditions(monday: number): Observable<Addition[]> {
    return this._client.transfer(
      this._requestFactory.createGetAdditionsRequest(
        this._paramFactory.createStartParams(monday)));
  }

  public addAddition(day: Date): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createNewAdditionRequest(
        new Addition(day)));
  }

  public deleteAddition(addition: Addition): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createDeleteAdditionRequest(
        addition));
  }

  public getHolidays(monday: number): Observable<Holiday[]> {
    return this._client.transfer(
      this._requestFactory.createGetHolidaysRequest(
        this._paramFactory.createStartParams(monday)));
  }

  public addHoliday(day: Date): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createNewHolidayRequest(
        new Holiday(day)));
  }

  public deleteHoliday(holiday: Holiday): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createDeleteHolidayRequest(
        holiday));
  }

  public getReservations(monday: number): Observable<Reservation[]> {
    return this._client.transfer(
      this._requestFactory.createGetReservationsRequest(
        this._paramFactory.createStartParams(monday)));
  }

  public addReservation(day: Date, event: string, user: ApplicationUser): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createNewReservationRequest(
        new Reservation(user, event, day)));
  }

  public deleteReservation(reservation: Reservation): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createDeleteReservationRequest(
        reservation));
  }

}

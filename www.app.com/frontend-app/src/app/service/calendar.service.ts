import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {Observable} from "rxjs/Observable";
import {OrderDay} from "../model/backend/calendar/order-day";
import {SuccessResponse} from "../model/response/success-response";
import {Event} from "../model/backend/calendar/event";
import {Slot} from "../model/backend/calendar/slot";

@Injectable()
export class CalendarService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory) { }

  public getEvents(): Observable<Event[]> {
    return this.client.transfer(this.requestFactory.createEventsRequest());
  }

  public getOrderDays(): Observable<OrderDay[]> {
    return this.client.transfer(this.requestFactory.createOrderDaysRequest());
  }

  public reserve(event: Event, slot: Slot): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createReservationRequest(
        this.dtoFactory.createReservationDTO(event, slot)));
  }
}

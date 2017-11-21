import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {DtoFactory} from "../factory/dto-factory";
import {RequestFactory} from "../factory/request-factory";
import {Observable} from "rxjs/Observable";
import {OrderDay} from "../model/order-day";
import {ParamFactory} from "../factory/param-factory";
import {SuccessResponse} from "../model/response/success-response";

@Injectable()
export class CalendarService {

  constructor(
    private _client: HttpClient,
    private _dtoFactory: DtoFactory,
    private _paramFactory: ParamFactory,
    private _requestFactory: RequestFactory) { }

  public getOrderDays(monday: Date): Observable<OrderDay[]> {
    return this._client.transfer(
      this._requestFactory.createOrderDaysRequest(
        this._paramFactory.createOrderDaysParams(monday)));
  }

  addOrderDay(day: OrderDay): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createNewOrderDayRequest(
        this._dtoFactory.createNewOrderDayDTO(day)));
  }
}

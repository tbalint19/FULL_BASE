import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {Observable} from "rxjs/Observable";
import {SuccessResponse} from "../model/response/success-response";

@Injectable()
export class CalendarService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory) { }


}

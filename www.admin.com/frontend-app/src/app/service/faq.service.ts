import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {Observable} from "rxjs/Observable";
import {Faq} from "../model/backend/faq/faq";
import {RequestFactory} from "../factory/request-factory";
import {SuccessResponse} from "../model/response/success-response";

@Injectable()
export class FaqService {

  constructor(private client: HttpClient, private factory: RequestFactory) { }

  public getImageNames(): Observable<string[]> {
    return this.client.transfer(this.factory.createGetImageNamesRequest());
  }

  public getAll(): Observable<Faq[]> {
    return this.client.transfer(this.factory.createGetFaqRequest());
  }

  public create(faq: Faq): Observable<SuccessResponse> {
    return this.client.transfer(this.factory.createFaqEditRequest(faq));
  }

  public delete(faq: Faq): Observable<SuccessResponse> {
    return this.client.transfer(this.factory.createFaqDeleteRequest(faq));
  }

}

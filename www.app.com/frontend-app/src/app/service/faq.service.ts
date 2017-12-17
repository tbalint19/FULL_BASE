import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {Observable} from "rxjs/Observable";
import {Faq} from "../model/backend/faq/faq";

@Injectable()
export class FaqService {

  constructor(private client: HttpClient, private factory: RequestFactory) { }

  public getFaqs(): Observable<Faq[]> {
    return this.client.transfer(this.factory.createGetFaqRequest())
  }

}

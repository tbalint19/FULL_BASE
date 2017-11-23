import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {Observable} from "rxjs/Observable";
import {MainMessage} from "../model/backend/info/main-message";

@Injectable()
export class InfoService {

  constructor(
    private client: HttpClient,
    private factory: RequestFactory) { }

  getMainMessage(): Observable<MainMessage> {
    return this.client.transfer(this.factory.createMainMessageRequest());
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {Observable} from "rxjs/Observable";
import {ApplicationUser} from "../model/backend/auth/application-user";

@Injectable()
export class PrivateMessageService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory) { }

  public getUsers(): Observable<ApplicationUser[]> {
    return this.client.transfer(this.requestFactory.createGetUsersRequest());
  }
}

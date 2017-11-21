import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {Observable} from "rxjs/Observable";
import {MainMessage} from "../model/main-message";
import {SuccessResponse} from "../model/response/success-response";
import {MainMessageCreator} from "../model/creator/main-message-creator";

@Injectable()
export class MainMessageService {

  constructor(
    private _client: HttpClient,
    private _requestFactory: RequestFactory,
    private _dtoFactory: DtoFactory) { }

  public getMainMessage(): Observable<MainMessage> {
    return this._client.transfer(this._requestFactory.createMainMessageGetRequest())
  }

  public updateMainMessage(creator: MainMessageCreator): Observable<SuccessResponse> {
    return this._client.transfer(
      this._requestFactory.createMainMessageUpdateRequest(
        this._dtoFactory.createMainMessageUpdateDTO(
          creator)))
  }
}

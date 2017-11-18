import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {Observable} from "rxjs/Observable";
import {SuccessResponse} from "../model/response/success-response";
import {RequestFactory} from "../factory/request-factory";
import {ResetEmailParamsCreator} from "../model/creator/reset-email-params-creator";
import {ParamFactory} from "../factory/param-factory";
import {ResetDtoCreator} from "../model/creator/reset-dto-creator";
import {DtoFactory} from "../factory/dto-factory";

@Injectable()
export class ResetService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private paramFactory: ParamFactory,
    private dtoFactory: DtoFactory) { }

  public requestReset(creator: ResetEmailParamsCreator): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createResetEmailRequest(
        this.paramFactory.createResetEmailParams(creator)));
  }

  public attemptReset(creator: ResetDtoCreator): Observable<SuccessResponse> {
    return this.client.transfer(this.requestFactory.createResetRequest(
      this.dtoFactory.createResetDTO(creator)));
  }
}

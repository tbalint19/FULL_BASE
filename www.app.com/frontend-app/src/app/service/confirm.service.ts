import { Injectable } from '@angular/core';
import {HttpClient} from '../http/http.client';
import {ConfirmationDTO} from "../model/dto/confirm-dto";
import {Observable} from "rxjs/Observable";
import {TokenResponse} from "../model/response/token-response";
import {RequestFactory} from "../factory/request-factory";
import {HttpRequest} from "../model/http/http-request.model";
import {SuccessResponse} from "../model/response/success-response";
import {ConfirmEmailParams} from "../model/params/confirm-email-params.model";
import {DtoFactory} from "../factory/dto-factory";
import {ConfirmDtoCreator} from "../model/creator/confirm-dto-creator";
import {ConfirmEmailParamsCreator} from "../model/creator/confirm-email-params-creator";
import {ParamFactory} from "../factory/param-factory";


@Injectable()
export class ConfirmService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory,
    private paramFactory: ParamFactory) { }

  public requestConfirm(creator: ConfirmEmailParamsCreator): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createConfirmEmailRequest(
        this.paramFactory.createConfirmEmailParams(creator)));
  }

  public attemptConfirm(creator: ConfirmDtoCreator): Observable<TokenResponse> {
    return this.client.transfer(
      this.requestFactory.createConfirmRequest(
        this.dtoFactory.createConfirmDTO(creator)));
  }

}

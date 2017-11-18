import { Injectable } from '@angular/core';
import {HttpClient} from '../http/http.client';
import {SuccessResponse} from '../model/response/success-response';
import {Observable} from 'rxjs/Observable';
import {SignupDTO} from '../model/dto/signup-dto';
import {RequestFactory} from "../factory/request-factory";
import {CheckUsernameParams} from "../model/params/check-username-params.model";
import {CheckResponse} from "../model/response/check-response";
import {CheckEmailParams} from "../model/params/check-email-params.model";
import {DtoFactory} from "../factory/dto-factory";
import {SignupDtoCreator} from "../model/creator/signup-dto-creator";
import {ParamFactory} from "../factory/param-factory";

@Injectable()
export class SignupService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    protected dtoFactory: DtoFactory,
    private paramFactory: ParamFactory) { }

  public checkUsername(creator: SignupDtoCreator): Observable<CheckResponse> {
    return this.client.transfer(
      this.requestFactory.createUsernameCheckRequest(
        this.paramFactory.createUsernameCheckParams(creator)));
  }

  public checkEmail(creator: SignupDtoCreator): Observable<CheckResponse> {
    return this.client.transfer(
      this.requestFactory.createEmailCheckRequest(
        this.paramFactory.createEmailCheckParams(creator)));
  }

  public attemptSignup(creator: SignupDtoCreator): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createSignupRequest(
        this.dtoFactory.createSignupDTO(creator)));
  }

}

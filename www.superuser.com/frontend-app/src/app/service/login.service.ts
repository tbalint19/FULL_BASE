import { Injectable } from '@angular/core';
import {HttpClient} from '../http/http.client';
import {Observable} from 'rxjs/Observable';
import {TokenResponse} from '../model/response/token-response';
import {RequestFactory} from "../factory/request-factory";
import {LoginDtoCreator} from "../model/creator/login-dto-creator";
import {DtoFactory} from "../factory/dto-factory";

@Injectable()
export class LoginService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory
  ) { }

  public attemptLogin(creator: LoginDtoCreator): Observable<TokenResponse> {
    return this.client.transfer(
      this.requestFactory.createLoginRequest(
        this.dtoFactory.createLoginDTO(creator)));
  }
}

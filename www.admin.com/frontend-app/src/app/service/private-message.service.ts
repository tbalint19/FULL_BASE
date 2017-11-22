import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {Observable} from "rxjs/Observable";
import {ApplicationUser} from "../model/backend/auth/application-user";
import {Message} from "../model/backend/message/message";
import {RespondDtoCreator} from "../model/creator/respond-dto-creator";
import {SuccessResponse} from "../model/response/success-response";

@Injectable()
export class PrivateMessageService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory) { }

  public getUsers(): Observable<ApplicationUser[]> {
    return this.client.transfer(this.requestFactory.createGetUsersRequest());
  }

  public getMessages(user: ApplicationUser): Observable<Message[]> {
    return this.client.transfer(
      this.requestFactory.createGetMessagesRequest(user.id));
  }

  public respond(creator: RespondDtoCreator): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createRespondRequest(
        this.dtoFactory.createRespondCreatorDTO(creator)));
  }
}

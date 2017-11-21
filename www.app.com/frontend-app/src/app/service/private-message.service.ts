import { Injectable } from '@angular/core';
import {HttpClient} from "../http/http.client";
import {DtoFactory} from "../factory/dto-factory";
import {Observable} from "rxjs/Observable";
import {Message} from "../model/backend/message/message";
import {RequestFactory} from "../factory/request-factory";
import {SuccessResponse} from "../model/response/success-response";
import {MessageCreateDtoCreator} from "../model/creator/message-create-dto-creator";

@Injectable()
export class PrivateMessageService {

  constructor(
    private client: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory) { }

  public getAll(): Observable<Message[]> {
    return this.client.transfer(this.requestFactory.createGetMessagesRequest())
  }

  public send(creator: MessageCreateDtoCreator): Observable<SuccessResponse> {
    return this.client.transfer(
      this.requestFactory.createNewMessageRequest(
        this.dtoFactory.createMessageCreateDTO(creator)));
  }

}

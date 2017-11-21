import {Injectable} from "@angular/core";
import {MainMessageCreator} from "../model/creator/main-message-creator";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {MainMessageValidator} from "../validator/main-message-validator";

@Injectable()
export class InfoStatus {

  public creator: MainMessageCreator;

  constructor(
    private _requestObserver: HttpClient,
    private _requestFactory: RequestFactory,
    private _dtoFactory: DtoFactory,
    private _validator: MainMessageValidator){
    this.creator = new MainMessageCreator();
  }

  public isFetchingMainMessage(): boolean {
    return this._requestObserver.findPending(
      this._requestFactory.createMainMessageGetRequest())
  }

  public isUpdatingMainMessage(): boolean {
    return this._requestObserver.findPending(
      this._requestFactory.createMainMessageUpdateRequest(
        this._dtoFactory.createMainMessageUpdateDTO(
          this.creator)))
  }

  public onlyOneIsUpdated(): boolean {
    return this._validator.onlyOneIsUpdated(this.creator.identifier);
  }

  public isDisabled(): boolean {
    return !this.onlyOneIsUpdated()
      || this.isFetchingMainMessage()
      || this.isUpdatingMainMessage();
  }
}

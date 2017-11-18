import {Injectable} from "@angular/core";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {CredentialValidator} from "../validator/credential-validator";
import {ResetEmailParams} from "../model/params/reset-email-params.model";
import {ParamFactory} from "../factory/param-factory";
import {ResetEmailParamsCreator} from "../model/creator/reset-email-params-creator";

@Injectable()
export class ResetStartStatus {

  public creator: ResetEmailParamsCreator;

  private _isOpen: boolean;

  constructor(
    private _validator: CredentialValidator,
    private _requestObserver: HttpClient,
    private requestFactory: RequestFactory,
    private paramFactory: ParamFactory){
    this.creator = new ResetEmailParamsCreator();
  }

  public credentialIsValid(): boolean {
    return this._validator.validFormat(this.creator.credential);
  }

  public isOpen(): boolean {
    return this._isOpen;
  }

  public toggle(to: boolean): void {
    this._isOpen = to;
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this.requestFactory.createResetEmailRequest(
        this.paramFactory.createResetEmailParams(this.creator)));
  }

  public isPossible(): boolean {
    return this.credentialIsValid() && !this.isPending();
  }

}

import {Injectable} from "@angular/core";
import {ConfirmCodeValidator} from "../validator/confirm-code-validator";
import {CredentialValidator} from "../validator/credential-validator";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {DtoFactory} from "../factory/dto-factory";
import {ConfirmDtoCreator} from "../model/creator/confirm-dto-creator";
import {ConfirmEmailParamsCreator} from "../model/creator/confirm-email-params-creator";

@Injectable()
export class ConfirmStatus {

  public confirmDtoCreator: ConfirmDtoCreator;
  public confirmEmailParamsCreator: ConfirmEmailParamsCreator;

  private _suspended: boolean;

  constructor(
    private _confirmCodeValidator: ConfirmCodeValidator,
    private _credentialValidator: CredentialValidator,
    private _requestObserver: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory){
    this.confirmDtoCreator = new ConfirmDtoCreator();
    this.confirmEmailParamsCreator = new ConfirmEmailParamsCreator();
  }

  public setSuspended(isSuspended: boolean): void {
    this._suspended = isSuspended;
  }

  public codeIsValid(): boolean {
    return this._confirmCodeValidator.validFormat(this.confirmDtoCreator.code);
  }

  public credentialIsValid(): boolean {
    return this._credentialValidator.validFormat(this.confirmDtoCreator.credential);
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this.requestFactory.createConfirmRequest(
        this.dtoFactory.createConfirmDTO(this.confirmDtoCreator)));
  }

  public isSuspended(): boolean {
    return this._suspended;
  }

  public isPossible(): boolean {
    return this.codeIsValid() && this.credentialIsValid();
  }
}

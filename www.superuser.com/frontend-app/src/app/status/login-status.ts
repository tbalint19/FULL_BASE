import {Injectable} from "@angular/core";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {CredentialValidator} from "../validator/credential-validator";
import {PasswordValidator} from "../validator/password-validator";
import {LoginDtoCreator} from "../model/creator/login-dto-creator";
import {DtoFactory} from "../factory/dto-factory";

@Injectable()
export class LoginStatus {

  public creator: LoginDtoCreator;

  private _isSuspended: boolean;

  constructor(
    private _requestObserver: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory,
    private _credentialValidator: CredentialValidator,
    private _passwordValidator: PasswordValidator
  ){
    this.creator = new LoginDtoCreator();
  }

  public setSuspended(isSuspended: boolean): void {
    this._isSuspended = isSuspended;
  }

  public credentialIsValid(): boolean{
    return this._credentialValidator.validFormat(this.creator.credential);
  }

  public passwordIsValid(): boolean {
    return this._passwordValidator.validFormat(this.creator.password);
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this.requestFactory.createLoginRequest(
        this.dtoFactory.createLoginDTO(this.creator)));
  }

  public isSuspended(): boolean {
    return this._isSuspended;
  }

  public isDisabled(): boolean {
    return this.isSuspended() || this.isPending();
  }

  public isPossible(): boolean {
    return this.credentialIsValid() && this.passwordIsValid() && !this.isPending();
  }
}

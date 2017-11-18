import {Injectable} from "@angular/core";
import {ResetCodeValidator} from "../validator/reset-code-validator";
import {HttpClient} from "../http/http.client";
import {RequestFactory} from "../factory/request-factory";
import {UsernameValidator} from "../validator/username-validator";
import {PasswordValidator} from "../validator/password-validator";
import {ResetDtoCreator} from "../model/creator/reset-dto-creator";
import {DtoFactory} from "../factory/dto-factory";

@Injectable()
export class ResetStatus {

  public resetDtoCreator: ResetDtoCreator;

  private _suspended: boolean;

  constructor(
    private _usernameValidator: UsernameValidator,
    private _codeValidator: ResetCodeValidator,
    private _passwordValidator: PasswordValidator,
    private _requestObserver: HttpClient,
    private requestFactory: RequestFactory,
    private dtoFactory: DtoFactory){
    this.resetDtoCreator = new ResetDtoCreator();
  }

  public setSuspended(isSuspended: boolean): void {
    this._suspended = isSuspended;
  }

  public usernameIsValid(): boolean {
    return this._usernameValidator.validFormat(this.resetDtoCreator.username);
  }

  public resetIsValid(): boolean {
    return this._codeValidator.validFormat(this.resetDtoCreator.code);
  }

  public passwordIsValid(): boolean {
    return this._passwordValidator.validFormat(this.resetDtoCreator.password);
  }

  public passwordMatches(): boolean {
    return this.resetDtoCreator.password == this.resetDtoCreator.passwordAgain;
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this.requestFactory.createResetRequest(
        this.dtoFactory.createResetDTO(this.resetDtoCreator)));
  }

  public isPossible(): boolean {
    return this.usernameIsValid() && this.resetIsValid() && this.passwordIsValid() && this.passwordMatches();
  }

  public isSuspended(): boolean {
    return this._suspended;
  }

}

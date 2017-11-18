import {SignupDTO} from "../model/dto/signup-dto";
import {UsernameValidator} from "../validator/username-validator";
import {HttpClient} from "../http/http.client";
import {HttpRequest} from "../model/http/http-request.model";
import {RequestFactory} from "../factory/request-factory";
import {Injectable, OnInit} from "@angular/core";
import {EmailValidator} from "../validator/email-validator";
import {PasswordValidator} from "../validator/password-validator";
import {CheckUsernameParams} from "../model/params/check-username-params.model";
import {CheckEmailParams} from "../model/params/check-email-params.model";
import {SignupDtoCreator} from "../model/creator/signup-dto-creator";
import {DtoFactory} from "../factory/dto-factory";
import {ParamFactory} from "../factory/param-factory";

@Injectable()
export class SignupStatus {

  public creator: SignupDtoCreator;

  private _usernameIsAvailable: boolean;
  private _emailIsAvailable: boolean;
  private _isSuspended: boolean;

  constructor(
    private _requestObserver: HttpClient,
    private _requestFactory: RequestFactory,
    private _dtoFactory: DtoFactory,
    private paramFactory: ParamFactory,
    private _usernameValidator: UsernameValidator,
    private _emailValidator: EmailValidator,
    private _passwordValidator: PasswordValidator){
    this.creator = new SignupDtoCreator();
  }


  public setSuspended(isSuspended: boolean): void {
    this._isSuspended = isSuspended;
  }

  public usernameIsValid(): boolean {
    return this._usernameValidator.validFormat(this.creator.username);
  }

  public usernameIsChecked(): boolean {
    return this._requestObserver.findPending(
      this._requestFactory.createUsernameCheckRequest(
        this.paramFactory.createUsernameCheckParams(this.creator)));
  }

  public usernameIsAvailable(): boolean {
    return this._usernameIsAvailable;
  }

  public setUsernameAvailability(available: boolean): void {
    this._usernameIsAvailable = available;
  }

  public emailIsValid(): boolean {
    return this._emailValidator.validFormat(this.creator.email);
  }

  public emailIsChecked(): boolean {
    return this._requestObserver.findPending(
      this._requestFactory.createEmailCheckRequest(
        this.paramFactory.createEmailCheckParams(this.creator)));
  }

  public emailIsAvailable(): boolean {
    return this._emailIsAvailable;
  }

  public setEmailAvailability(available: boolean): void {
    this._emailIsAvailable = available;
  }

  public passwordIsValid(): boolean {
    return this._passwordValidator.validFormat(this.creator.password);
  }

  public passwordMatches(): boolean {
    return this.creator.password == this.creator.passwordAgain;
  }

  public isPending(): boolean {
    return this._requestObserver.findPending(
      this._requestFactory.createSignupRequest(
        this._dtoFactory.createSignupDTO(this.creator)
      ));
  }

  public isSuspended(): boolean {
    return this._isSuspended;
  }

  public isDisabled(): boolean {
    return this.isPending() || this.isSuspended();
  }

  public isPossible(): boolean {
    return this.usernameIsValid() && !this.usernameIsChecked() && this.usernameIsAvailable() &&
      this.emailIsValid() && !this.emailIsChecked() && this.emailIsAvailable() &&
      this.passwordIsValid() && this.passwordMatches() &&
      !this.isPending();
  }

}

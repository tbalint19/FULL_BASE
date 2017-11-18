import {Injectable} from "@angular/core";
import {ResetEmailParamsCreator} from "../model/creator/reset-email-params-creator";
import {ResetEmailParams} from "../model/params/reset-email-params.model";
import {ConfirmEmailParams} from "../model/params/confirm-email-params.model";
import {ConfirmEmailParamsCreator} from "../model/creator/confirm-email-params-creator";
import {CheckUsernameParams} from "../model/params/check-username-params.model";
import {CheckEmailParams} from "../model/params/check-email-params.model";
import {SignupDtoCreator} from "../model/creator/signup-dto-creator";

@Injectable()
export class ParamFactory {

  public createUsernameCheckParams(creator: SignupDtoCreator): CheckUsernameParams {
    let params = new CheckUsernameParams();
    params.username = creator.username;
    return params;
  }

  public createEmailCheckParams(creator: SignupDtoCreator): CheckEmailParams {
    let params = new CheckEmailParams();
    params.email = creator.email;
    return params;
  }

  public createConfirmEmailParams(creator: ConfirmEmailParamsCreator): ConfirmEmailParams {
    let params = new ConfirmEmailParams();
    params.credential = creator.credential;
    return params;
  }

  public createResetEmailParams(creator: ResetEmailParamsCreator): ResetEmailParams {
    let params = new ResetEmailParams();
    params.credential = creator.credential;
    return params;
  }
}

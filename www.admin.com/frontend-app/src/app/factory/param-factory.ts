import {Injectable} from "@angular/core";
import {ResetEmailParamsCreator} from "../model/creator/reset-email-params-creator";
import {ResetEmailParams} from "../model/params/reset-email-params.model";

@Injectable()
export class ParamFactory {

  public createResetEmailParams(creator: ResetEmailParamsCreator): ResetEmailParams {
    let params = new ResetEmailParams();
    params.credential = creator.credential;
    return params;
  }
}

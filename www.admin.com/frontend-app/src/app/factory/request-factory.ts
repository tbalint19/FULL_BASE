import {HttpRequest} from "../model/http/http-request.model";
import {Injectable} from "@angular/core";
import {LoginDTO} from "../model/dto/login-dto";
import {ResetEmailParams} from "../model/params/reset-email-params.model";
import {ResetDTO} from "../model/dto/reset-dto";

@Injectable()
export class RequestFactory {

  public createLoginRequest(user: LoginDTO): HttpRequest {
    return new HttpRequest("/api/admin/login", "POST", user);
  }

  public createResetEmailRequest(params: ResetEmailParams): HttpRequest{
    return new HttpRequest("/api/reset/start", "GET", params);
  }

  public createResetRequest(dto: ResetDTO): HttpRequest{
    return new HttpRequest("/api/reset/finish", "POST", dto);
  }
}

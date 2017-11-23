import {HttpRequest} from "../model/http/http-request.model";
import {Injectable} from "@angular/core";
import {SignupDTO} from "../model/dto/signup-dto";
import {LoginDTO} from "../model/dto/login-dto";
import {ConfirmationDTO} from "../model/dto/confirm-dto";
import {ResetEmailParams} from "../model/params/reset-email-params.model";
import {ConfirmEmailParams} from "../model/params/confirm-email-params.model";
import {CheckUsernameParams} from "../model/params/check-username-params.model";
import {CheckEmailParams} from "../model/params/check-email-params.model";
import {ResetDTO} from "../model/dto/reset-dto";
import {MessageCreateDTO} from "../model/dto/message-create-dto";
import {ReservationDto} from "../model/dto/reservation-dto";

@Injectable()
export class RequestFactory {

  public createUsernameCheckRequest(params: CheckUsernameParams): HttpRequest {
    return new HttpRequest("/api/check/username", "GET", params);
  }

  public createEmailCheckRequest(params: CheckEmailParams): HttpRequest {
    return new HttpRequest("/api/check/email", "GET", params);
  }

  public createSignupRequest(user: SignupDTO): HttpRequest {
    return new HttpRequest("/api/auth/signup", "POST", user);
  }

  public createLoginRequest(user: LoginDTO): HttpRequest {
    return new HttpRequest("/api/auth/login", "POST", user);
  }

  public createConfirmEmailRequest(params: ConfirmEmailParams): HttpRequest {
    return new HttpRequest("/api/confirm/start", "GET", params);
  }

  public createConfirmRequest(confirmation: ConfirmationDTO): HttpRequest {
    return new HttpRequest("/api/confirm/finish", "POST", confirmation);
  }

  public createResetEmailRequest(params: ResetEmailParams): HttpRequest{
    return new HttpRequest("/api/reset/start", "GET", params);
  }

  public createResetRequest(dto: ResetDTO): HttpRequest{
    return new HttpRequest("/api/reset/finish", "POST", dto);
  }

  public createGetMessagesRequest(): HttpRequest {
    return new HttpRequest("/api/message/all", "GET", null);
  }

  public createNewMessageRequest(dto: MessageCreateDTO): HttpRequest {
    return new HttpRequest("/api/message/send", "POST", dto);
  }

  public createMainMessageRequest(): HttpRequest {
    return new HttpRequest("/api/info/mainmessage/get", "GET", null);
  }

  public createEventsRequest(): HttpRequest {
    return new HttpRequest("/api/calendar/event/all", "GET", null);
  }

  public createOrderDaysRequest(): HttpRequest {
    return new HttpRequest("/api/calendar/orderday/all", "GET", null);
  }

  public createReservationRequest(dto: ReservationDto): HttpRequest {
    return new HttpRequest("/api/calendar/reservation/reserve", "POST", dto);
  }
}

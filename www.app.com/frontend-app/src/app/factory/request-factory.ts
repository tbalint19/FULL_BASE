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
import {StartParams} from "../model/params/start-params";
import {Reservation} from "../model/backend/calendar/reservation";

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
    return new HttpRequest("/api/confirm/request", "GET", params);
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
    return new HttpRequest("/api/info/mainmessage/get/home", "GET", null);
  }

  createGetReservationsRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/reservation/all", "GET", params);
  }

  createGetHolidaysRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/holiday/all", "GET", params);
  }

  createGetRestrictionsRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/restriction/all", "GET", params);
  }

  createGetAdditionsRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/addition/all", "GET", params);
  }

  createReservationRequest(reservation: Reservation): HttpRequest {
    return new HttpRequest("/api/calendar/reservation/create", "POST", reservation);
  }

  createGetFaqRequest(): HttpRequest {
    return new HttpRequest("/api/faq/all", "GET", null);
  }

  createGetMyReservationsRequest() {
    return new HttpRequest("/api/calendar/reservation/users", "GET", null);
  }

  createDeleteReservationRequest(reservation: Reservation) {
    return new HttpRequest("/api/calendar/reservation/delete", "POST", reservation);
  }

  createCalendarMessageRequest() {
    return new HttpRequest("/api/info/mainmessage/get/calendar", "GET", null);
  }

  createCalendarRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/data/all", "GET", params);
  }
}

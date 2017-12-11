import {HttpRequest} from "../model/http/http-request.model";
import {Injectable} from "@angular/core";
import {LoginDTO} from "../model/dto/login-dto";
import {ResetEmailParams} from "../model/params/reset-email-params.model";
import {ResetDTO} from "../model/dto/reset-dto";
import {MainMessageUpdateDto} from "../model/dto/main-message-update-dto";
import {ApplicationUser} from "../model/backend/auth/application-user";
import {RespondDto} from "../model/dto/respond-dto";
import {StartParams} from "../model/params/start-params";
import {Restriction} from "../model/backend/calendar/restriction";
import {Addition} from "../model/backend/calendar/addition";
import {Holiday} from "../model/backend/calendar/holiday";
import {Reservation} from "../model/backend/calendar/reservation";
import {Faq} from "../model/backend/faq/faq";

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

  public createMainMessageGetRequest(): HttpRequest {
    return new HttpRequest("/api/info/mainmessage/get/home", "GET", null);
  }

  public createCalendarMessageGetRequest(): HttpRequest {
    return new HttpRequest("/api/info/mainmessage/get/calendar", "GET", null);
  }

  public createMainMessageUpdateRequest(dto: MainMessageUpdateDto): HttpRequest {
    return new HttpRequest("/api/info/mainmessage/update", "POST", dto);
  }

  createGetUsersRequest(): HttpRequest {
    return new HttpRequest("/api/message/users", "GET", null);
  }

  createGetMessagesRequest(userId: number): HttpRequest {
    return new HttpRequest("/api/message/all", "GET", {userId});
  }

  createRespondRequest(dto: RespondDto): HttpRequest {
    return new HttpRequest("/api/message/respond", "POST", dto);
  }

  createGetRestrictionsRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/restriction/all", "GET", params);
  }

  createNewRestrictionRequest(restriction: Restriction): HttpRequest {
    return new HttpRequest("/api/calendar/restriction/create", "POST", restriction);
  }

  createDeleteRestrictionRequest(restriction: Restriction): HttpRequest {
    return new HttpRequest("/api/calendar/restriction/delete", "POST", restriction);
  }

  createGetAdditionsRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/addition/all", "GET", params);
  }

  createNewAdditionRequest(addition: Addition): HttpRequest {
    return new HttpRequest("/api/calendar/addition/create", "POST", addition);
  }

  createDeleteAdditionRequest(addition: Addition): HttpRequest {
    return new HttpRequest("/api/calendar/addition/delete", "POST", addition);
  }

  createGetHolidaysRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/holiday/all", "GET", params);
  }

  createNewHolidayRequest(holiday: Holiday): HttpRequest {
    return new HttpRequest("/api/calendar/holiday/create", "POST", holiday);
  }

  createDeleteHolidayRequest(holiday: Holiday): HttpRequest {
    return new HttpRequest("/api/calendar/holiday/delete", "POST", holiday);
  }

  createGetReservationsRequest(params: StartParams): HttpRequest {
    return new HttpRequest("/api/calendar/reservation/all", "GET", params);
  }

  createNewReservationRequest(reservation: Reservation): HttpRequest {
    return new HttpRequest("/api/calendar/reservation/create", "POST", reservation);
  }

  createDeleteReservationRequest(reservation: Reservation) {
    return new HttpRequest("/api/calendar/reservation/delete", "POST", reservation);
  }

  createGetFaqRequest(): HttpRequest {
    return new HttpRequest("/api/faq/all", "GET", null);
  }

  createFaqEditRequest(faq: Faq): HttpRequest {
    return new HttpRequest("/api/faq/create", "POST", faq);
  }

  createFaqDeleteRequest(faq: Faq): HttpRequest {
    return new HttpRequest("/api/faq/delete", "POST", faq);
  }
}

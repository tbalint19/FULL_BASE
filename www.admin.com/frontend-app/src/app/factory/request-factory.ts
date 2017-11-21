import {HttpRequest} from "../model/http/http-request.model";
import {Injectable} from "@angular/core";
import {LoginDTO} from "../model/dto/login-dto";
import {ResetEmailParams} from "../model/params/reset-email-params.model";
import {ResetDTO} from "../model/dto/reset-dto";
import {MainMessageUpdateDto} from "../model/dto/main-message-update-dto";
import {OrderDayParams} from "../model/params/order-day-params";
import {NewOrderDayDTO} from "../model/dto/new-order-day-dto";

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
    return new HttpRequest("/api/info/mainmessage/get", "GET", null);
  }

  public createMainMessageUpdateRequest(dto: MainMessageUpdateDto): HttpRequest {
    return new HttpRequest("/api/info/mainmessage/update", "POST", dto);
  }

  createOrderDaysRequest(params: OrderDayParams): HttpRequest {
    return new HttpRequest("/api/calendar/orderday/weekly", "GET", params);
  }

  createNewOrderDayRequest(dto: NewOrderDayDTO): HttpRequest {
    return new HttpRequest("/api/calendar/orderday/new", "POST", dto);
  }
}

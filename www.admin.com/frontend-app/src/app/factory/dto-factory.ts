import {Injectable} from "@angular/core";
import {LoginDtoCreator} from "../model/creator/login-dto-creator";
import {LoginDTO} from "../model/dto/login-dto";
import {ResetDtoCreator} from "../model/creator/reset-dto-creator";
import {ResetDTO} from "../model/dto/reset-dto";
import {MainMessageCreator} from "../model/creator/main-message-creator";
import {MainMessage} from "../model/main-message";
import {MainMessageUpdateDto} from "../model/dto/main-message-update-dto";
import {NewOrderDayDTO} from "../model/dto/new-order-day-dto";
import {OrderDay} from "../model/order-day";

@Injectable()
export class DtoFactory {

  public createLoginDTO(creator: LoginDtoCreator): LoginDTO {
    let dto = new LoginDTO();
    dto.credential = creator.credential;
    dto.password = creator.password;
    return dto;
  }

  public createResetDTO(creator: ResetDtoCreator): ResetDTO {
    let dto = new ResetDTO();
    dto.username = creator.username;
    dto.password = creator.password;
    dto.code = creator.code;
    return dto;
  }

  public createMainMessageUpdateDTO(creator: MainMessageCreator): MainMessageUpdateDto {
    let dto = new MainMessageUpdateDto();
    dto.id = creator.id;
    dto.title = creator.title;
    dto.text = creator.text;
    dto.type = creator.type;
    dto.identifier = creator.identifier;
    return dto;
  }

  createNewOrderDayDTO(day: OrderDay): NewOrderDayDTO {
    let dto = new NewOrderDayDTO();

    return dto;
  }
}

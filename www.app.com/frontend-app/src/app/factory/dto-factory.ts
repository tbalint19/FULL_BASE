import {Injectable} from "@angular/core";
import {SignupDtoCreator} from "../model/creator/signup-dto-creator";
import {SignupDTO} from "../model/dto/signup-dto";
import {LoginDtoCreator} from "../model/creator/login-dto-creator";
import {LoginDTO} from "../model/dto/login-dto";
import {ConfirmDtoCreator} from "../model/creator/confirm-dto-creator";
import {ConfirmationDTO} from "../model/dto/confirm-dto";
import {ResetDtoCreator} from "../model/creator/reset-dto-creator";
import {ResetDTO} from "../model/dto/reset-dto";
import {MessageCreateDtoCreator} from "../model/creator/message-create-dto-creator";
import {MessageCreateDTO} from "../model/dto/message-create-dto";
import {ResetService} from "../service/reset.service";
import {ReservationDto} from "../model/dto/reservation-dto";



@Injectable()
export class DtoFactory {

  public createSignupDTO(creator: SignupDtoCreator): SignupDTO {
    let dto = new SignupDTO();
    dto.username = creator.username;
    dto.email = creator.email;
    dto.password = creator.password;
    return dto;
  }

  public createLoginDTO(creator: LoginDtoCreator): LoginDTO {
    let dto = new LoginDTO();
    dto.credential = creator.credential;
    dto.password = creator.password;
    return dto;
  }

  public createConfirmDTO(creator: ConfirmDtoCreator): ConfirmationDTO {
    let dto = new ConfirmationDTO();
    dto.credential = creator.credential;
    dto.code = creator.code;
    return dto;
  }

  public createResetDTO(creator: ResetDtoCreator): ResetDTO {
    let dto = new ResetDTO();
    dto.username = creator.username;
    dto.password = creator.password;
    dto.code = creator.code;
    return dto;
  }

  public createMessageCreateDTO(creator: MessageCreateDtoCreator): MessageCreateDTO {
    let dto = new MessageCreateDTO();
    dto.text = creator.message;
    return dto;
  }

  createReservationDTO(event: string, slot: Date): ReservationDto {
    let dto = new ReservationDto();
    return dto;
  }
}

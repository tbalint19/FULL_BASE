import {Injectable} from "@angular/core";
import {LoginDtoCreator} from "../model/creator/login-dto-creator";
import {LoginDTO} from "../model/dto/login-dto";
import {ResetDtoCreator} from "../model/creator/reset-dto-creator";
import {ResetDTO} from "../model/dto/reset-dto";

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

}

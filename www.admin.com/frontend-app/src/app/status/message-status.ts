import {Injectable} from "@angular/core";
import {ApplicationUser} from "../model/backend/auth/application-user";
import {Message} from "../model/backend/message/message";
import {RespondDtoCreator} from "../model/creator/respond-dto-creator";

@Injectable()
export class MessageStatus {

  public users: ApplicationUser[];
  public selectedUser: ApplicationUser;
  public messages: Message[];
  public creator: RespondDtoCreator;

  constructor(){
    this.users = [];
    this.selectedUser = null;
    this.messages = [];
    this.creator = new RespondDtoCreator();
  }


}

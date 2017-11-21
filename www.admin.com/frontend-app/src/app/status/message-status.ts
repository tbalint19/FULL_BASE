import {Injectable} from "@angular/core";
import {ApplicationUser} from "../model/backend/auth/application-user";
import {Message} from "../model/backend/message/message";

@Injectable()
export class MessageStatus {

  public users: ApplicationUser[];
  public selectedUser: ApplicationUser;
  public messages: Message[];

  constructor(){
    this.users = [];
    this.selectedUser = null;
    this.messages = [];
  }


}

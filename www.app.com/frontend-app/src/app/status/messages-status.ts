import {Injectable} from "@angular/core";
import {Message} from "../model/backend/message/message";
import {MessageCreateDtoCreator} from "../model/creator/message-create-dto-creator";

@Injectable()
export class MessagesStatus {

  public messages: Message[];
  public creator: MessageCreateDtoCreator;

  constructor(){
    this.messages = [];
    this.creator = new MessageCreateDtoCreator;
  }
}

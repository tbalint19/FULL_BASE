import {Injectable} from "@angular/core";
import {MainMessage} from "../model/main-message";
import {MainMessageCreator} from "../model/creator/main-message-creator";
import {Event} from "../model/event";
import {EventCreatorDtoCreator} from "../model/creator/event-creator-dto-creator";

@Injectable()
export class CreatorFactory {

  public createMainMessageCreator(mainMessage: MainMessage): MainMessageCreator {
    let creator = new MainMessageCreator();
    creator.id = mainMessage.id;
    creator.title = mainMessage.title;
    creator.text = mainMessage.text;
    creator.type = mainMessage.type;
    creator.identifier = mainMessage.identifier;
    return creator;
  }

}

import { Component, OnInit } from '@angular/core';
import {InfoStatus} from "../../status/info-status";
import {InfoType} from "../../model/info-type.enum";
import {MainMessageService} from "../../service/main-message.service";
import {CreatorFactory} from "../../factory/creator-factory";
import {MainMessage} from "../../model/main-message";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  constructor(
    public status: InfoStatus,
    private service: MainMessageService,
    private factory: CreatorFactory,
    private messages: MessageService) { }

  ngOnInit() {
    this.getMainMessage();
    this.getCalendarMessage();
  }

  public getMainMessage(): void {
    this.service.getMainMessage().subscribe(
      (message: MainMessage) => {
        this.status.creator = this.factory.createMainMessageCreator(message);
      }
    );
  }

  public getCalendarMessage(): void {
    this.service.getCalendarMessage().subscribe(
      (message: MainMessage) => {
        this.status.calendarCreator = this.factory.createMainMessageCreator(message);
      }
    );
  }

  public saveMainMessage(): void {
    this.service.updateMainMessage(this.status.creator).subscribe(
      (response: SuccessResponse) => {
        this.messages.add(response.successful ?
          new Success("Mentve", "Főoldali üzenet módosítva") :
          new Error("Hiba", "..."));
        this.getMainMessage();
      }
    );
  }

  public saveCalendarMessage(): void {
    this.service.updateMainMessage(this.status.calendarCreator).subscribe(
      (response: SuccessResponse) => {
        this.messages.add(response.successful ?
          new Success("Mentve", "Naptár oldali üzenet módosítva") :
          new Error("Hiba", "..."));
        this.getMainMessage();
      }
    );
  }

  public infoTypes(): string[] {
    return [InfoType.SUCCESS, InfoType.ERROR, InfoType.DEFAULT, InfoType.NONE]
      .map((e) => InfoType[e]);
  }

}

import { Component, OnInit } from '@angular/core';
import {MessagesStatus} from "../../status/messages-status";
import {PrivateMessageService} from "../../service/private-message.service";
import {Message} from "../../model/backend/message/message";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {

  constructor(
    private messages: MessageService,
    public status: MessagesStatus,
    private service: PrivateMessageService) { }

  ngOnInit() {
    this.status.creator.reset();
    this.getAll();
  }

  private getAll(): void {
    this.service.getAll().subscribe(
      (messages: Message[]) => this.status.messages = messages
    );
  }

  public send(): void {
    if (this.status.creator.message.length < 1) {
      this.messages.add(new Error("Hiba", "Üres üzenet"));
      return;
    }
    this.service.send(this.status.creator).subscribe(
      (response: SuccessResponse) => {
        if (response.successful) {
          this.messages.add(new Success("Üzenet", "Elküldve"));
          this.status.creator.reset();
          this.getAll();
        } else {
          this.messages.add(new Error("Hiba", "Próbálja újra"));
        }
      }
    );
  }

  public orderedMessages(): Message[] {
    return this.status.messages.sort(
      (one: Message, other: Message) => {
        let firstDate = new Date();
        firstDate.setTime(one.created);
        let secondDate = new Date();
        secondDate.setTime(other.created);
        return secondDate.getTime() - firstDate.getTime();
      }
    )
  }
}

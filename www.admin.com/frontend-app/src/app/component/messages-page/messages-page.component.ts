import { Component, OnInit } from '@angular/core';
import {MessageStatus} from "../../status/message-status";
import {PrivateMessageService} from "../../service/private-message.service";
import {ApplicationUser} from "../../model/backend/auth/application-user";
import {Message} from "../../model/backend/message/message";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";
import {init} from "protractor/built/launcher";

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent implements OnInit {

  constructor(
    private messages: MessageService,
    public status: MessageStatus,
    private service: PrivateMessageService) {
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.status.creator.reset();
    this.status.messages = [];
    this.status.selectedUser = null;
    this.getUsers();
  }

  getUsers(): void {
    this.service.getUsers().subscribe(
      (users: ApplicationUser[]) => this.status.users = this.orderUsers(users)
    );
  }

  getMessages(): void {
    this.service.getMessages(this.status.selectedUser).subscribe(
      (messages: Message[]) => this.status.messages = messages
    );
  }

  selectUser(user: ApplicationUser): void {
    this.status.selectedUser = user;
    this.status.creator.user = user;
    this.getMessages();
  }

  send(): void {
    this.service.respond(this.status.creator).subscribe(
      (response: SuccessResponse) => {
        if (response.successful) {
          this.messages.add(new Success("Sikeres", "Válasz"));
          this.init();
        } else {
          this.messages.add(new Error("Hiba", "Sikertelen"));
        }
      }
    );
  }

  orderedMessages(): Message[] {
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

  orderUsers(users: ApplicationUser[]): ApplicationUser[] {
    return users.sort(
      (one, other) => {
        // let oneIsUsers = one.channel.messages[one.channel.messages.length - 1].isUserMessage;
        // let otherIsUsers = other.channel.messages[other.channel.messages.length - 1].isUserMessage;
        // let sameStatus = oneIsUsers == otherIsUsers;
        // return sameStatus ? this.sortByDate(one, other) : this.sortByStatus(one, other);
        return this.sortByDate(one, other);
      }
    )
  }

  sortByStatus(one: ApplicationUser, other: ApplicationUser): number {
    let oneIsUsers = one.channel.messages[one.channel.messages.length - 1].isUserMessage;
    let otherIsUsers = other.channel.messages[other.channel.messages.length - 1].isUserMessage;
    return oneIsUsers ? 1 : -1;
  }

  sortByDate(one: ApplicationUser, other: ApplicationUser): number {
    let oneLast = one.channel.messages[one.channel.messages.length - 1].created;
    let otherLast = other.channel.messages[other.channel.messages.length - 1].created;
    return oneLast < otherLast ? 1 : -1;
  }

  lastTime(user: ApplicationUser): string {
    if (user.channel.messages.length < 1) {
      return "";
    }
    let date = user.channel.messages[user.channel.messages.length - 1].created;
    let actualDate = new Date();
    actualDate.setTime(date);
    return "" + (actualDate.getMonth() + 1) + "." + actualDate.getDate() + " (" + actualDate.getHours() + ":" + actualDate.getMinutes() + ")";
  }

  lastIsUsers(user: ApplicationUser): boolean {
    if (user.channel.messages.length < 1) {
      return false;
    }
    return user.channel.messages[user.channel.messages.length - 1].isUserMessage;
  }
}

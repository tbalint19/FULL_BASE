import { Component, OnInit } from '@angular/core';
import {MessageStatus} from "../../status/message-status";
import {PrivateMessageService} from "../../service/private-message.service";
import {ApplicationUser} from "../../model/backend/auth/application-user";

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent implements OnInit {

  constructor(
    protected status: MessageStatus,
    private service: PrivateMessageService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.service.getUsers().subscribe(
      (users: ApplicationUser[]) => this.status.users = users
    );
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {LoginStatus} from "../../status/login-status";
import {SuccessResponse} from "../../model/response/success-response";
import {ResetEmailParams} from "../../model/params/reset-email-params.model";
import {ResetService} from "../../service/reset.service";
import {Message} from "../../model/message/message.model";
import {MessageService} from "../../service/message.service";
import {ResetStartStatus} from "../../status/reset-start-status";
import {Error} from "../../model/message/error.model";
import {Success} from "../../model/message/success.model";

@Component({
  selector: 'reset-popup',
  templateUrl: './reset-popup.component.html',
  styleUrls: ['./reset-popup.component.css']
})
export class ResetPopupComponent implements OnInit {

  constructor(
    private service: ResetService,
    private messages: MessageService,
    public status: ResetStartStatus
  ) { }

  ngOnInit() {
    this.status.creator.reset();
  }

  public openReset(): void {
    this.status.toggle(true);
    this.status.creator.reset();
  }

  public requestReset(): void {
    if (!this.status.isPossible()){
      this.handleError()
      return;
    }
    this.service.requestReset(this.status.creator).subscribe(
      (response: SuccessResponse) => this.handleResetRequest(response.successful)
    );
  }

  public closeReset(): void {
    document.getElementById(
      "reset-modal").classList.add("modal-flyaway");
    document.getElementById(
      "reset-modal-background").classList.add("background-disappear");
    setTimeout(() => { this.status.toggle(false) }, 400)
  }

  private handleResetRequest(successful: boolean): void {
    return successful ? this.handleSuccess() : this.handleError();
  }

  private handleSuccess(): void {
    this.messages.add(
      new Success("Email", "Kiküldve"));
    this.closeReset();
  }

  private handleError(): void {
    this.messages.add(
      new Error("Nem létező", "Felhasználó"));
    this.closeReset();
  }

}

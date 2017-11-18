import {Component, OnInit} from '@angular/core';
import {SuccessResponse} from "../../model/response/success-response";
import {ResetService} from "../../service/reset.service";
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
    protected status: ResetStartStatus
  ) { }

  ngOnInit() {
    this.status.creator.reset();
  }

  protected openReset(): void {
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
      new Success("Email sent", "Your mail should arrive in a few seconds"));
    this.closeReset();
  }

  private handleError(): void {
    this.messages.add(
      new Error("Invalid credentials", "No email is sent"));
    this.closeReset();
  }

}

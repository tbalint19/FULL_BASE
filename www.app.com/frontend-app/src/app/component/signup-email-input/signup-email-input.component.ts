import {Component, OnInit} from '@angular/core';
import {SignupStatus} from "../../status/signup-status";
import {CheckResponse} from "../../model/response/check-response";
import {SignupService} from "../../service/signup.service";

@Component({
  selector: 'signup-email-input',
  templateUrl: './signup-email-input.component.html',
  styleUrls: ['./signup-email-input.component.css']
})
export class SignupEmailInputComponent implements OnInit {

  constructor(
    private service: SignupService,
    public status: SignupStatus
  ) { }

  ngOnInit() {
  }

  public checkEmail(): void {
    if (!this.status.emailIsValid()){ return; }
    this.service.checkEmail(this.status.creator)
      .subscribe((response: CheckResponse) => this.handleResponse(response));
  }

  public handleResponse(response: CheckResponse): void {
    this.status.setEmailAvailability(response.available);
  }

}

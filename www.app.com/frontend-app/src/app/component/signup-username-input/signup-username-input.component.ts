import {Component, OnInit} from '@angular/core';
import {SignupStatus} from "../../status/signup-status";
import {CheckResponse} from "../../model/response/check-response";
import {SignupService} from "../../service/signup.service";

@Component({
  selector: 'signup-username-input',
  templateUrl: './signup-username-input.component.html',
  styleUrls: ['./signup-username-input.component.css']
})
export class SignupUsernameInputComponent implements OnInit {

  constructor(
    private service: SignupService,
    public status: SignupStatus) { }

  ngOnInit() {
  }

  public checkUsername(): void {
    if (!this.status.usernameIsValid()){ return; }
    this.service.checkUsername(this.status.creator)
      .subscribe((response: CheckResponse) => this.handleResponse(response));
  }

  private handleResponse(response: CheckResponse): void {
    this.status.setUsernameAvailability(response.available);
  }

}

import {Component, OnInit} from '@angular/core';
import {SignupStatus} from "../../status/signup-status";

@Component({
  selector: 'signup-password-again-input',
  templateUrl: './signup-password-again-input.component.html',
  styleUrls: ['./signup-password-again-input.component.css']
})
export class SignupPasswordAgainInputComponent implements OnInit {

  constructor(
    public status: SignupStatus
  ) { }

  ngOnInit() {
  }

}

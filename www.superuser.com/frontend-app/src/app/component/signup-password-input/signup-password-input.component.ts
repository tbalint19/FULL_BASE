import {Component, OnInit} from '@angular/core';
import {SignupStatus} from "../../status/signup-status";

@Component({
  selector: 'signup-password-input',
  templateUrl: './signup-password-input.component.html',
  styleUrls: ['./signup-password-input.component.css']
})
export class SignupPasswordInputComponent implements OnInit {

  constructor(
    protected status: SignupStatus
  ) { }

  ngOnInit() {
  }

}

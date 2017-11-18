import { Component, OnInit } from '@angular/core';
import {SignupStatus} from "../../status/signup-status";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(protected status: SignupStatus) { }

  ngOnInit() {
    this.status.creator.reset();
  }

}

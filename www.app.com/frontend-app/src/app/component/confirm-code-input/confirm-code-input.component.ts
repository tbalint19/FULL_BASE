import { Component, OnInit } from '@angular/core';
import {ConfirmStatus} from "../../status/confirm-status";

@Component({
  selector: 'confirm-code-input',
  templateUrl: './confirm-code-input.component.html',
  styleUrls: ['./confirm-code-input.component.css']
})
export class ConfirmCodeInputComponent implements OnInit {

  constructor(protected status: ConfirmStatus) { }

  ngOnInit() {
  }

}

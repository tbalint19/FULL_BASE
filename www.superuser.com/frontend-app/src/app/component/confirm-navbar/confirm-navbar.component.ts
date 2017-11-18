import {Component, OnInit} from '@angular/core';
import {ConfirmStatus} from "../../status/confirm-status";

@Component({
  selector: 'confirm-navbar',
  templateUrl: './confirm-navbar.component.html',
  styleUrls: ['./confirm-navbar.component.css']
})
export class ConfirmNavbarComponent implements OnInit {

  constructor(protected status: ConfirmStatus) { }

  ngOnInit() {
  }

}

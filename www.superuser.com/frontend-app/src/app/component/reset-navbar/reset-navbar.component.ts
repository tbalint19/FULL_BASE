import {Component, OnInit} from '@angular/core';
import {ResetStatus} from "../../status/reset-status";

@Component({
  selector: 'reset-navbar',
  templateUrl: './reset-navbar.component.html',
  styleUrls: ['./reset-navbar.component.css']
})
export class ResetNavbarComponent implements OnInit {

  constructor(protected status: ResetStatus) { }

  ngOnInit() {
  }

}

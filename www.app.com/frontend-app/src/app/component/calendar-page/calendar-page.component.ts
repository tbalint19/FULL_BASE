import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  constructor(protected authStatus: AuthStatus) { }

  ngOnInit() {
  }

}

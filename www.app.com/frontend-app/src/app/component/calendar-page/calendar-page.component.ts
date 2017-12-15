import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";
import {CalendarStatus} from "../../status/calendar-status";
import {CalendarService} from "../../service/calendar.service";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  constructor(
    private messages: MessageService,
    protected authStatus: AuthStatus,
    protected status: CalendarStatus,
    private service: CalendarService) { }

  ngOnInit() {
  }

  protected reserve(): void {

  }

  protected showDate(dateNumber: number): string {
    let date = new Date();
    date.setTime(dateNumber);
    return "" + (date.getMonth() + 1) + "." + date.getDate();
  }

  protected showTime(dateNumber: number): string {
    let date = new Date();
    date.setTime(dateNumber);
    return "" + date.getHours() + ":" + date.getMinutes();
  }

}

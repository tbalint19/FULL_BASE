import { Component, OnInit } from '@angular/core';
import {CalendarStatus} from "../../status/calendar-status";
import {CalendarService} from "../../service/calendar.service";
import {OrderDay} from "../../model/order-day";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";
import {Event} from "../../model/event";


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  constructor(
    protected status: CalendarStatus,
    private service: CalendarService,
    private messages: MessageService) { }

  ngOnInit() {
    this.status.eventCreator.reset();
    this.status.selectedMonday = this.getPreviousMonday();
    this.status.selectedDay = new Date();
    this.getOrderDays();
  }

  private getOrderDays(): void {
    this.service.getOrderDays(this.status.selectedMonday).subscribe(
      (orderDays: OrderDay[]) => this.status.orderDaysOfTheWeek = orderDays
    )
  }

  protected addOrderDay(day: Date): void {
    this.service.addOrderDay(this.status.orderDaysOfTheWeek.find(
      (orderDay: OrderDay) => orderDay.date.getTime() == day.getTime()
    )).subscribe(
      (response: SuccessResponse) => this.messages.add(
        response.successful ?
          new Success("Hozzáadva", "Új rendelési nap készült") :
          new Error("Hiba", "Történt")
      )
    );
  }

  protected selectEvent(event: Event): void {
    
  }

  private AddEvent(): void {

  }

  private getPreviousMonday(): Date {
    let prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
    return prevMonday;
  }

  protected selectDay(day: Date): void {
    this.status.selectedDay = day;
  }

  protected nextWeek(direction: string): void {
    if (direction == 'start') {
      this.status.selectedMonday = this.getPreviousMonday();
      this.status.selectedDay = new Date();
    } else {
      let newMonday = new Date();
      let oneWeek = 1000*60*60*24*7;
      newMonday.setTime(this.status.selectedMonday.getTime() + (direction == "forward" ? oneWeek : -oneWeek));
      this.status.selectedMonday = newMonday;
      this.status.selectedDay = newMonday.getTime() == this.getPreviousMonday().getTime() ? new Date() : newMonday;
    }
  }

  protected selected(day: Date): boolean {
    return day.getDay() == this.status.selectedDay.getDay()
  }

  protected printDayName(day: number): string {
    switch (day){
      case 0: return "Vasárnap";
      case 1: return "Hétfő";
      case 2: return "Kedd";
      case 3: return "Szerda";
      case 4: return "Csütörtök";
      case 5: return "Péntek";
      case 6: return "Szombat";
    }
  }

  protected printHours(hour: number): string {
    return hour.toString().length == 1 ? "0" +  hour.toString() : hour.toString();
  }

  protected printMinutes(minute: number): string {
    return minute.toString().length == 1 ? "0" +  minute.toString() : minute.toString();
  }

  protected printDate(day: Date): string {
    return day.getTime() == this.status.selectedDay.getTime() ?
      day.getFullYear().toString() + "." + (day.getMonth()+1).toString() + "." + day.getDate().toString() :
      day.getDate().toString();
  }

}

import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";
import {CalendarStatus} from "../../status/calendar-status";
import {CalendarService} from "../../service/calendar.service";
import {Event} from "../../model/backend/calendar/event";
import {OrderDay} from "../../model/backend/calendar/order-day";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";
import {Slot} from "../../model/backend/calendar/slot";


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
    this.getEvents();
    this.getOrderDays();
  }

  private getEvents(): void {
    this.service.getEvents().subscribe(
      (events: Event[]) => this.status.allExistingEvents = events
    );
  }

  private getOrderDays(): void {
    this.service.getOrderDays().subscribe(
      (orderDays: OrderDay[]) => {
        console.log(orderDays)
        this.status.upcomingOrderDays = orderDays
      }
    );
  }

  protected getFilteredOrderDays(): OrderDay[] {
    return this.status.upcomingOrderDays.filter(
      (entry: OrderDay) => entry.events.find(
        (event: Event) => event.id == this.status.selectedEvent.id
      )
    )
  }

  protected getFilteredSlots(): Slot[] {
    return this.status.selectedOrderDay.slots.filter(
      (entry: Slot) => entry.active
    );
  }

  protected updateSelectedEvent(): void {
    this.status.selectedOrderDay = null;
    this.status.selectedSlot = null;
  }

  protected updateSelectedOrderDay(): void {
    this.status.selectedSlot = null;
  }

  protected updateSelectedSlot(): void {

  }

  protected reserve(): void {
    this.service.reserve(this.status.selectedEvent, this.status.selectedSlot).subscribe(
      (response: SuccessResponse) => {
        if (response.successful) {
          this.messages.add(new Success("Sikeres", "Foglalás"));
        } else {
          this.messages.add(new Error("Sikertelen", "Foglalás"));
        }
      }
    );
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

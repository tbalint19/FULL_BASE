import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";
import {CalendarStatus} from "../../status/calendar-status";
import {CalendarService} from "../../service/calendar.service";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";
import {Addition} from "../../model/backend/calendar/addition";
import {Holiday} from "../../model/backend/calendar/holiday";
import {Restriction} from "../../model/backend/calendar/restriction";
import {Reservation} from "../../model/backend/calendar/reservation";
import {init} from "protractor/built/launcher";
import {DatePrinterService} from "../../service/date-printer.service";
import {FilterService} from "../../service/filter.service";
import {Slot} from "../../model/slot";
import {MainMessage} from "../../model/backend/info/main-message";
import {CalendarDto} from "../../model/backend/calendar/calendar-dto";


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  constructor(
    public filterer: FilterService,
    public printer: DatePrinterService,
    private messages: MessageService,
    public authStatus: AuthStatus,
    public status: CalendarStatus,
    private service: CalendarService) { }

  ngOnInit() {
    this.getMessage();
    this.initialize();
  }

  getMessage(): void {
    this.service.getMessage().subscribe(
      (message: MainMessage) => this.status.message = message
    );
  }

  openEditor(): void {
    this.status.selectedEvent = null;
    this.status.selectedDay = null;
    this.status.selectedSlot = null;
    this.status.childName = null;
    this.status.editorOpened = true;
  }

  closeEditor(): void {
    this.status.selectedEvent = null;
    this.status.selectedDay = null;
    this.status.selectedSlot = null;
    this.status.childName = null;
    this.status.editorOpened = false;
  }

  createReservation(): void {
    this.status.setPending(true);
    this.service.createReservation(this.status.selectedEvent, this.status.selectedSlot, this.status.childName)
      .subscribe((response: SuccessResponse) => this.handleResponse(response));
    this.closeEditor();
  }

  deleteReservation(reservation: Reservation): void {
    this.status.setPending(true);
    this.service.deleteReservation(reservation).subscribe(
      (response: SuccessResponse) => this.handleResponse(response));
  }

  getEvents(): string[] {
    return this.filterer.getEvents()
  }

  getDays(): Date[] {
    return this.filterer.getDays(
      this.status.selectedEvent,
      this.status.additions,
      this.status.holidays,
      this.status.restrictions,
      this.status.reservations)
  }

  getSlots(): Slot[] {
    return this.filterer.getSlots(
      this.status.selectedEvent, this.status.selectedDay,
      this.status.reservations, this.status.additions
    );
  }

  private handleResponse(response: SuccessResponse): void {
    if (response && response.successful) {
      this.messages.add(new Success("Sikeres", "Módosítás"));
      this.initialize();
    } else {
      this.messages.add(new Error("Sikertelen", "Módosítás"));
    }
  }

  private initialize(): void {
    this.status.setPending(true);
    this.status.ownReservations = [];
    this.service.getAll().subscribe(
      (dto: CalendarDto) => {
        this.status.additions = dto.additions;
        this.status.holidays = dto.holidays;
        this.status.restrictions = dto.restrictions;
        this.status.reservations = dto.reservations;
        this.status.ownReservations = dto.ownReservations;
        this.status.setPending(false);
      }
    );
  }

}

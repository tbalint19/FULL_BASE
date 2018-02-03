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
import {CalendarBuilder} from "../../service/calendar-builder";
import {Week} from "../../model/week";
import {Day} from "../../model/day";


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  public builder: CalendarBuilder;

  constructor(
    public filterer: FilterService,
    public printer: DatePrinterService,
    private messages: MessageService,
    public authStatus: AuthStatus,
    public status: CalendarStatus,
    private service: CalendarService) {
    this.builder = new CalendarBuilder();
  }

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
    this.initialize();
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
    return this.filterer.getEvents();
  }

  getDaysOfWeeksForEvent(): Week[] {
    return this.filterer.getDaysOfWeeksForEvent(this.status.selectedEvent, this.status.month);
  }

  getWeeksDays(weekNumber: number): Day[] {
    return this.getDaysOfWeeksForEvent()[weekNumber].days;
  }

  getSlotsForDay(): Slot[] {
    return this.filterer.getSlotsForDay(this.status.selectedEvent, this.status.selectedDay);
  }

  private handleResponse(response: SuccessResponse): void {
    if (response && response.successful) {
      this.messages.add(new Success("Sikeres", "Foglalás"));
    } else {
      this.messages.add(new Error("Sikertelen", "Közben lefoglalták - próbáljon egy másik időpontot."));
    }
    this.initialize();
  }

  private initialize(): void {
    this.status.setPending(true);
    this.status.month = this.builder.buildCalendar(new Date());
    this.status.ownReservations = [];
    this.service.getAll().subscribe(
      (dto: CalendarDto) => {
        this.status.ownReservations = dto.ownReservations;
        try {
          this.builder.fillCalendar(
            this.status.month, dto.additions, dto.holidays, dto.restrictions, dto.reservations);
          this.status.setPending(false);
        } catch (e) {
          this.messages.add(new Error(
            "Átmenetileg nem üzemel.", "Kérjük foglaljon telefonon, vagy nézzen vissza később."))
        }
      }
    );
  }

  getPlaceholder(): string {
    return this.status.selectedEvent == "Oltás" ? "Gyerek neve és a kért oltás" : "Gyerek neve";
  }

}

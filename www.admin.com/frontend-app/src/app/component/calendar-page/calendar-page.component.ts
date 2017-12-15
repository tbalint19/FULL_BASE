import { Component, OnInit } from '@angular/core';
import {CalendarStatus} from "../../status/calendar-status";
import {CalendarService} from "../../service/calendar.service";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";
import {PrivateMessageService} from "../../service/private-message.service";
import {Addition} from "../../model/backend/calendar/addition";
import {ApplicationUser} from "../../model/backend/auth/application-user";
import {Holiday} from "../../model/backend/calendar/holiday";
import {Restriction} from "../../model/backend/calendar/restriction";
import {Reservation} from "../../model/backend/calendar/reservation";


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  constructor(
    public status: CalendarStatus,
    private service: CalendarService,
    private userService: PrivateMessageService,
    private messages: MessageService) { }

  ngOnInit() {
    this.status.selectedMonday = this.getPreviousMonday();
    this.status.selectedDay = new Date();
    this.getUsers();
    this.getWeeklyData();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: ApplicationUser[]) => this.status.users = users
    );
  }

  getWeeklyData(): void {
    this.status.restrictionsOfTheWeek = [];
    this.status.additionsOfTheWeek = [];
    this.status.reservationsOfTheWeek = [];
    this.status.holidaysOfTheWeek = [];
    this.getAdditions();
    this.getReservations();
    this.getRestrictions();
    this.getHolidays();
  }

  addHoliday(): void {
    this.service.addHoliday(this.status.selectedDay).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  deleteHoliday(): void {
    let holiday = this.status.holidaysOfTheWeek.find(
      h => this.matchWToday(h, this.status.selectedDay));
    this.service.deleteHoliday(holiday).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  addAddition(): void {
    this.service.addAddition(this.status.selectedDay).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  deleteAddition(): void {
    let addition = this.status.additionsOfTheWeek.find(
      a => this.matchWToday(a, this.status.selectedDay));
    this.service.deleteAddition(addition).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  addRestriction(quarter: Date): void {
    this.service.addRestriction(quarter).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  deleteRestriction(restriction: Restriction): void {
    this.service.deleteRestriction(restriction).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  addReservation(): void {
    let date = this.status.selectedQuarter;
    let user = this.status.selectedUser;
    let event = this.status.selectedEvent;
    this.status.reservationEditorOpened = false;
    this.service.addReservation(date, event, user).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  deleteReservation(): void {
    this.status.reservationEditorOpened = false;
    this.service.deleteReservation(this.status.selectedReservation).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  disabled(): boolean {
    return this.status.selectedEvent == null || (this.status.selectedEvent != "Szünet" && this.status.selectedUser == null);
  }

  handleResponse(response: SuccessResponse): void {
    if (response && response.successful) {
      this.messages.add(new Success("Sikeres", "Módosítás"));
      this.getWeeklyData();
    } else {
      this.messages.add(new Error("Ooops", "Próbálja újra"));
    }
  }

  getAdditions(): void {
    this.service.getAdditions(this.status.selectedMonday.getTime()).subscribe(
      (additions: Addition[]) => this.status.additionsOfTheWeek = additions
    );
  }

  getHolidays(): void {
    this.service.getHolidays(this.status.selectedMonday.getTime()).subscribe(
      (holidays: Holiday[]) => this.status.holidaysOfTheWeek = holidays
    );
  }

  getRestrictions(): void {
    this.service.getRestrictions(this.status.selectedMonday.getTime()).subscribe(
      (restricions: Restriction[]) => this.status.restrictionsOfTheWeek = restricions
    );
  }

  getReservations(): void {
    this.service.getReservations(this.status.selectedMonday.getTime()).subscribe(
      (reservations: Reservation[]) => this.status.reservationsOfTheWeek = reservations
    );
  }

  showDate(dateNumber: number): string {
    let date = new Date();
    date.setTime(dateNumber);
    return date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate();
  }

  showDateTime(dateNumber: number): string {
    let date = new Date();
    date.setTime(dateNumber);
    return (date.getMonth()+1) + "." + date.getDate() + " (" + date.getHours() + ":" + date.getMinutes() + ")";
  }

  getPreviousMonday(): Date {
    let prevMonday = new Date();
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
    prevMonday.setHours(0, 0, 0);
    return prevMonday;
  }

  selectDay(day: Date): void {
    this.status.selectedDay = day;
  }

  nextWeek(direction: string): void {
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
    this.getWeeklyData();
  }

  selected(day: Date): boolean {
    return day.getDay() == this.status.selectedDay.getDay()
  }

  printDayName(day: number): string {
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

  printHours(hour: number): string {
    return hour.toString().length == 1 ? "0" +  hour.toString() : hour.toString();
  }

  printMinutes(minute: number): string {
    return minute.toString().length == 1 ? "0" +  minute.toString() : minute.toString();
  }

  printDate(day: Date): string {
    return day.getTime() == this.status.selectedDay.getTime() ?
      day.getFullYear().toString() + "." + (day.getMonth()+1).toString() + "." + day.getDate().toString() :
      day.getDate().toString();
  }

  isWeekDay(day: Date): boolean {
    return !(day.getDay() == 6 || day.getDay() == 0);
  }

  hasHoliday(day: Date): boolean {
    return this.status.holidaysOfTheWeek.filter(
      h => this.matchWToday(h, day)).length > 0;
  }

  hasAddition(day: Date): boolean {
    return this.status.additionsOfTheWeek.filter(
      a => this.matchWToday(a, day)).length > 0;
  }

  isHoliday(day: Date): boolean {
    return this.hasHoliday(day) || (!this.isWeekDay(day) && !this.hasAddition(day));
  }

  matchWToday(fckinBugDate: any, day: Date): boolean {
    let date = new Date();
    date.setTime(fckinBugDate.date);
    return date.getDay() == day.getDay()
  }

  matchWithFullDate(fckinBugDate: any, day: Date): boolean {
    let date = new Date();
    date.setTime(fckinBugDate.date);
    return date.getDay() == day.getDay() && day.getHours() == date.getHours() && day.getMinutes() == date.getMinutes();
  }

  hasReservation(date: Date): boolean {
    return this.status.reservationsOfTheWeek.filter(
      r => this.matchWithFullDate(r, date)
    ).length > 0;
  }

  hasUserReservation(date: Date): boolean {
    return this.hasReservation(date) && this.status.reservationsOfTheWeek.filter(
      r => this.matchWithFullDate(r, date))[0].event != "Szünet";
  }

  hasBreak(date: Date): boolean {
    return this.hasReservation(date) && this.status.reservationsOfTheWeek.filter(
      r => this.matchWithFullDate(r, date))[0].event == "Szünet";
  }

  editQuarter(quarter: Date): void {
    this.status.selectedReservation = null;
    this.status.selectedUser = null;
    this.status.selectedEvent = null;
    this.status.selectedQuarter = null;
    if (this.hasReservation(quarter)) {
      this.status.selectedReservation = this.status.reservationsOfTheWeek.filter(
        r => this.matchWithFullDate(r, quarter)
      )[0];
    } else {
      this.status.selectedQuarter = quarter;
    }
    this.status.reservationEditorOpened = true;
  }

  closeEditor(): void {
    this.status.reservationEditorOpened = false;
  }

  getRelatedRestriction(quarter: Date): Restriction {
    let filtered = this.status.restrictionsOfTheWeek.filter(
      (r) => this.matchWithFullDate(r, quarter)
    );
    return filtered.length > 0 ? filtered[0] : null;
  }

  isPossibleVaccinate(date: Date): boolean {
    let day = date.getDay();
    let hours = date.getHours();
    let tuesdayProper = day == 2 && 14 <= hours && hours < 16;
    let wednesdayProper = day == 3 && 8 <= hours && hours < 10;
    let thursdayProper = day == 4 && 14 <= hours && hours < 16;
    let properTime = tuesdayProper || wednesdayProper || thursdayProper;
    return properTime;
  }
}

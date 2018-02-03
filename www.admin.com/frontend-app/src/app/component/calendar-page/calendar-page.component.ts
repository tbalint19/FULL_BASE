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
import {WeeklyData} from "../../model/weekly-data";
import {Slot} from "../../model/slot";
import {DatePrinter} from "../../service/date-printer.service";
import {DayInfo} from "../../model/day-info";
import {DaySchema} from "../../model/day-schema";


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  public selectedDay: Date;
  public selectedMonday: Date;
  public weeklyData: WeeklyData;

  constructor(
    public status: CalendarStatus,
    public printer: DatePrinter,
    private service: CalendarService,
    private userService: PrivateMessageService,
    private messages: MessageService) { }

  ngOnInit() {
    this.status.editedReservation = null;
    this.status.selectedDay.subscribe((day) => this.selectedDay = day);
    this.status.selectedMonday.subscribe((day) => this.selectedMonday = day);
    this.status.weeklyData.subscribe(
      (weeklyData: WeeklyData) => this.fillWeeklyData(weeklyData));
    this.getUsers();
  }

  daySchemas(): DaySchema[] {
    return WeeklyData.DAY_SCHEMAS;
  }

  selectDay(day: Date): void {
    this.status.selectedDay.next(day);
  }

  isSelected(day: Date): boolean {
    return day.getDay() == this.selectedDay.getDay()
  }

  showAddAddition(day: DayInfo): boolean {
    let noAddition = day.addition == null;
    let weekend = day.date.getDay() == 0 || day.date.getDay() == 6;
    let selected = this.isSelected(day.date);
    return selected && weekend && noAddition;
  }

  showRemoveAddition(day: DayInfo): boolean {
    let hasAddition = day.addition != null;
    let selected = this.isSelected(day.date);
    let hasNoReservation = day.slots.filter(
      slot => slot.relatedReservation != null).length == 0;
    return selected && hasAddition && hasNoReservation;
  }

  showAddHoliday(day: DayInfo): boolean {
    let noHoliday = day.holiday == null;
    let weekDay = 0 < day.date.getDay() && day.date.getDay() < 6;
    let selected = this.isSelected(day.date);
    let hasNoReservation = day.slots.filter(
      slot => slot.relatedReservation != null).length == 0;
    return selected && weekDay && noHoliday && hasNoReservation;
  }

  showRemoveHoliday(day: DayInfo): boolean {
    let hasHoliday = day.holiday != null;
    let selected = this.isSelected(day.date);
    return selected && hasHoliday;
  }

  showAddRestriction(day: DayInfo): boolean {
    let vaccinateAvailable = day.slots.find(s => s.isVaccinateTime) != null;
    let noRestriction = day.restriction == null;
    let hasAddition = day.addition != null;
    let weekDay = 0 < day.date.getDay() && day.date.getDay() < 6;
    let weekend = day.date.getDay() == 0 || day.date.getDay() == 6;
    let selected = this.isSelected(day.date);
    return selected &&
      (weekDay || (weekend && hasAddition)) &&
      noRestriction && vaccinateAvailable;
  }

  showRemoveRestriction(day: DayInfo): boolean {
    let hasRestriction = day.restriction != null;
    let selected = this.isSelected(day.date);
    return selected && hasRestriction
  }

  showSelector(day: DayInfo): boolean {
    let noSlots = day.slots.length < 1;
    let selected = this.isSelected(day.date)
    return selected && noSlots;
  }

  shouldShowName(slot: Slot): boolean {
    return slot.relatedReservation != null && slot.relatedReservation.childName != null;
  }

  colorV(slot: Slot): boolean {
    return slot.relatedReservation && slot.relatedReservation.event == "Oltás";
  }

  colorR(slot: Slot): boolean {
    return slot.relatedReservation && slot.relatedReservation.event == "Általános vizsgálat";
  }

  colorBreak(slot: Slot): boolean {
    return slot.relatedReservation && slot.relatedReservation.event == "Szünet";
  }

  colorHoliday(day: DayInfo): boolean {
    let weekDay = 0 < day.date.getDay() && day.date.getDay() < 6;
    let weekend = day.date.getDay() == 0 || day.date.getDay() == 6;
    let hasAddition = day.addition != null;
    let hasHoliday = day.holiday != null;
    return (weekDay && hasHoliday) || (weekend && !hasAddition);
  }

  openEditor(slot: Slot): void {
    this.status.editedReservation = slot.relatedReservation ?
      slot.relatedReservation : new Reservation(slot.start);
  }

  closeEditor(): void {
    this.status.editedReservation = null;
  }

  nextWeek(direction: string): void {
    if (direction == 'start') {
      this.status.selectedDay.next(new Date());
    } else {
      let oneWeekInMillis = 1000*60*60*24*7;
      let difference = direction == "forward" ? oneWeekInMillis : -oneWeekInMillis;
      let oneWeekAway = new Date(this.selectedDay.getTime() + difference);
      this.status.selectedDay.next(oneWeekAway);
    }
  }

  addHoliday(): void {
    this.service.addHoliday(this.selectedDay).subscribe(
      (response: SuccessResponse) => this.handleAddResponse(response)
    );
  }

  deleteHoliday(holiday: Holiday): void {
    this.service.deleteHoliday(holiday).subscribe(
      (response: SuccessResponse) => this.handleAddResponse(response)
    );
  }

  addAddition(): void {
    this.service.addAddition(this.selectedDay, this.status.selectedSchema.name).subscribe(
      (response: SuccessResponse) => this.handleAddResponse(response)
    );
  }

  deleteAddition(addition: Addition): void {
    this.service.deleteAddition(addition).subscribe(
      (response: SuccessResponse) => {
        this.handleAddResponse(response);
        location.reload();
      }
    );
  }

  addRestriction(): void {
    this.service.addRestriction(this.selectedDay).subscribe(
      (response: SuccessResponse) => this.handleAddResponse(response)
    );
  }

  deleteRestriction(restriction: Restriction): void {
    this.service.deleteRestriction(restriction).subscribe(
      (response: SuccessResponse) => this.handleAddResponse(response)
    );
  }

  addReservation(): void {
    this.service.addReservation(this.status.editedReservation).subscribe(
      (response: SuccessResponse) => this.handleAddResponse(response)
    );
    this.closeEditor();
  }

  deleteReservation(): void {
    this.service.deleteReservation(this.status.editedReservation)
      .subscribe((response: SuccessResponse) => this.handleAddResponse(response)
    );
    this.closeEditor();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: ApplicationUser[]) => this.status.users = users
    );
  }

  private fillWeeklyData(weeklyData: WeeklyData): void {
    this.weeklyData = weeklyData;
    if (!this.selectedMonday) { return; }
    this.getAdditions();
    this.getReservations();
    this.getRestrictions();
    this.getHolidays();
  }

  private getAdditions(): void {
    this.service.getAdditions(this.status.selectedMonday.getValue().getTime()).subscribe(
      (additions: Addition[]) => this.assignAdditions(additions)
    );
  }

  private getHolidays(): void {
    this.service.getHolidays(this.status.selectedMonday.getValue().getTime()).subscribe(
      (holidays: Holiday[]) => this.assignHolidays(holidays)
    );
  }

  private getRestrictions(): void {
    this.service.getRestrictions(this.status.selectedMonday.getValue().getTime()).subscribe(
      (restricions: Restriction[]) => this.assignRestrictions(restricions)
    );
  }

  private getReservations(): void {
    this.service.getReservations(this.status.selectedMonday.getValue().getTime()).subscribe(
      (reservations: Reservation[]) => this.assignReservations(reservations)
    );
  }

  private assignReservations(reservations: Reservation[]): void {
    this.status.weeklyData.getValue().days.forEach(
      (day) => day.slots.forEach(
        (slot) => slot.relatedReservation = null
      )
    );
    for (let reservation of reservations) {
      let rDate = new Date(reservation.date);
      let relatedDay = this.status.weeklyData.getValue().days.find(
        (day) => day.date.getDay() == rDate.getDay()
      );
      let relatedSlot = relatedDay.slots.find(
        (slot) => {
          let sameHours = slot.start.getHours() == rDate.getHours();
          let sameMinutes = slot.start.getMinutes() == rDate.getMinutes();
          return sameHours && sameMinutes;
        }
      );
      relatedSlot.relatedReservation = reservation;
    }
  }

  private assignHolidays(holidays: Holiday[]): void {
    this.status.weeklyData.getValue().days.forEach(
      (day) => day.holiday = null
    );
    holidays.forEach(
      (holiday) => {
        let hDate = new Date(holiday.date);
        let relatedDay = this.status.weeklyData.getValue().days.find(
          (day) => day.date.getDay() == hDate.getDay()
        );
        relatedDay.holiday = holiday;
      }
    );
  }

  private assignAdditions(additions: Addition[]): void {
    this.status.weeklyData.getValue().days.forEach(
      (day) => day.addition = null
    );
    let newDays = [];
    additions.forEach(
      (addition) => {
        let aDate = new Date(addition.date);
        let relatedDay = this.status.weeklyData.getValue().days[5].date.getDay() == aDate.getDay() ?
          this.status.weeklyData.getValue().days[5] :
          this.status.weeklyData.getValue().days[6];
        relatedDay.addition = addition;
        let relatedSchema = WeeklyData.GET_SCHEMA(addition.schemaName);
        let newDate = new Date(relatedDay.date);
        let dayInfo = new DayInfo(newDate, relatedSchema);
        newDays.push(dayInfo);
      }
    );
    let toAdd = []
    newDays.forEach(
      (dayInfo) => {
        let indexOfToReplace = this.weeklyData.days.findIndex(
          (d) => d.date.getDay() == dayInfo.date.getDay());
        if (indexOfToReplace > 0) {
          if (this.weeklyData.days[indexOfToReplace].slots.length == 0) {
            this.weeklyData.days[indexOfToReplace] = dayInfo;
            toAdd.push(dayInfo);
          }
        }
      }
    );
    if (toAdd.length > 0) {
      let newData = Object.assign({}, this.weeklyData);
      this.status.weeklyData.next(newData);
    }
  }

  private assignRestrictions(restrictions: Restriction[]): void {
    this.status.weeklyData.getValue().days.forEach(
      (day) => day.restriction = null
    );
    restrictions.forEach(
      (restriction) => {
        let rDate = new Date(restriction.date);
        let relatedDay = this.status.weeklyData.getValue().days.find(
          (day) => day.date.getDay() == rDate.getDay()
        );
        relatedDay.restriction = restriction;
      }
    );
  }

  private handleAddResponse(response: SuccessResponse): void {
    if (response && response.successful) {
      this.messages.add(new Success("Sikeres", "Módosítás"));
      this.fillWeeklyData(this.weeklyData);
    } else {
      this.messages.add(new Error("Sikertelen", "Kísérlet"));
    }
  }

}

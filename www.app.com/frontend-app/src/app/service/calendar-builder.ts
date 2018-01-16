import {DaySchema} from "../model/day-schema";
import {Month} from "../model/month";
import {Week} from "../model/week";
import {Day} from "../model/day";
import {Slot} from "../model/slot";
import {Addition} from "../model/backend/calendar/addition";
import {Holiday} from "../model/backend/calendar/holiday";
import {Restriction} from "../model/backend/calendar/restriction";
import {Reservation} from "../model/backend/calendar/reservation";

export class CalendarBuilder {

  public schemas: DaySchema[];
  private oneDayInMillis: number;
  private quarterInMillis: number;

  constructor() {
    this.oneDayInMillis = 24*60*60*1000;
    this.quarterInMillis = 15*60*1000;
    this.schemas = [
      new DaySchema("Hétfő", 16, 4, 0, 0),
      new DaySchema("Kedd", 16, 2, 14, 2),
      new DaySchema("Szerda", 10, 2, 8, 2),
      new DaySchema("Csütörtök", 14, 4, 14, 2),
      new DaySchema("Péntek(1)", 8, 4, 0, 0),
      new DaySchema("Péntek(2)", 16, 4, 0, 0),
      new DaySchema("Szabad", 0, 0, 0, 0)
    ];
  }

  buildCalendar(date: Date): Month {
    let month = new Month();
    month.weeks = [];

    let initialMonday = this.getPreviousMonday(date);
    let currentDay = new Date(initialMonday.getTime());

    for (let iW=0; iW<4; iW++){
      let week = new Week();
      let weekIsOdd = this.weekIsOdd(currentDay);
      week.days = [];
      for (let iD=0; iD<7; iD++) {
        let day = new Day();
        day.date = new Date(currentDay.getTime());
        let relatedSchema = this.findSchema(day.date, weekIsOdd);
        day.slots = this.buildDayFromSchema(day.date, relatedSchema);

        week.days.push(day);
        currentDay.setTime(currentDay.getTime() + this.oneDayInMillis);
      }

      month.weeks.push(week)
    }
    return month;
  }

  fillCalendar(
    month: Month,
    additions: Addition[],
    holidays: Holiday[],
    restrictions: Restriction[],
    reservations: Reservation[]): void {

    additions.forEach((addition: Addition) => {
      let relatedDay = month.getDays().find((day: Day) => {
        return day.date.getDate() == new Date(addition.date).getDate() &&
          day.date.getMonth() == new Date(addition.date).getMonth();
      });
      relatedDay.addition = addition;
      let schema = this.getSchema(relatedDay.addition.schemaName);
      relatedDay.slots = this.buildDayFromSchema(relatedDay.date, schema);
    });

    holidays.forEach((holiday: Holiday) => {
      let relatedDay = month.getDays().find((day: Day) => {
        return day.date.getDate() == new Date(holiday.date).getDate() &&
          day.date.getMonth() == new Date(holiday.date).getMonth();
      });
      relatedDay.holiday = holiday;
      relatedDay.slots = [];
    });

    restrictions.forEach((restriction: Restriction) => {
      let relatedDay = month.getDays().find((day: Day) => {
        return day.date.getDate() == new Date(restriction.date).getDate() &&
          day.date.getMonth() == new Date(restriction.date).getMonth();
      });
      relatedDay.restriction = restriction;
      relatedDay.slots.forEach(
        (slot: Slot) => slot.reservableFor = slot.reservableFor.filter(
          (event: string) => event != "Oltás"));
    });

    reservations.forEach((reservation: Reservation) => {
      let relatedSlot = month.getDays().find((day: Day) => {
        return day.date.getDate() == new Date(reservation.date).getDate() &&
          day.date.getMonth() == new Date(reservation.date).getMonth();
      }).slots.find((slot: Slot) => {
        return slot.date.getHours() == new Date(reservation.date).getHours() &&
          slot.date.getMinutes() == new Date(reservation.date).getMinutes();
      });
      relatedSlot.reservation = reservation;
      relatedSlot.reservableFor = [];
    });
  }

  private getSchema(name: string): DaySchema {
    return this.schemas.find((schema: DaySchema) => schema.name == name);
  }

  private findSchema(date: Date, isOdd: boolean): DaySchema {
    switch (date.getDay()) {
      case 1: return this.getSchema("Hétfő");
      case 2: return this.getSchema("Kedd");
      case 3: return this.getSchema("Szerda");
      case 4: return this.getSchema("Csütörtök");
      case 5: return this.weekIsOdd(date) ? this.getSchema("Péntek(1)") : this.getSchema("Péntek(2)");
      default: return this.getSchema("Szabad");
    }
  }

  private buildDayFromSchema(date: Date, schema: DaySchema): Slot[] {
    let slots = [];

    let rStart = schema.regularStart;
    let rStartTime = new Date(date.getTime());
    rStartTime.setHours(rStart, 0, 0);
    let currentSlotTime = new Date(rStartTime.getTime());
    let rNumber = schema.regularTime * 4;
    for (let i=0; i<rNumber; i++) {
      let slot = new Slot(new Date(currentSlotTime));
      slot.reservableFor = ["Általános vizsgálat"];
      slots.push(slot);
      currentSlotTime.setTime(currentSlotTime.getTime() + this.quarterInMillis);
    }

    let vStart = schema.vaccinateStart;
    let vStartTime = new Date(date.getTime());
    vStartTime.setHours(vStart, 0, 0);
    currentSlotTime = new Date(vStartTime.getTime());
    let vNumber = schema.vaccinateTime * 4;
    for (let i=0; i<vNumber; i++) {
      let slotForCurrentSlotTime = slots.find((s: Slot) => {
        return s.date.getHours() == currentSlotTime.getHours() &&
          s.date.getMinutes() == currentSlotTime.getMinutes();
      });
      if (slotForCurrentSlotTime) {
        slotForCurrentSlotTime.reservableFor.push("Oltás");
      } else {
        let slot = new Slot(new Date(currentSlotTime));
        slot.reservableFor = ["Oltás"];
        slots.push(slot);
      }
      currentSlotTime.setTime(currentSlotTime.getTime() + this.quarterInMillis);
    }

    return slots;
  }

  private weekIsOdd(monday: Date): boolean {
    return this.getWeekNumber(monday) % 2 == 1;
  }

  private getWeekNumber(date: Date): number {
    let monday = this.getPreviousMonday(date);
    let week1 = new Date(monday.getFullYear(), 0, 4);
    return 1 + Math.round(((monday.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  private getPreviousMonday(day: Date): Date {
    let prevMonday = new Date(day.getTime());
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
    prevMonday.setHours(12, 0, 0);
    return prevMonday;
  }

}

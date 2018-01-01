import { Injectable } from '@angular/core';
import {Slot} from "../model/slot";
import {Week} from "../model/week";
import {Day} from "../model/day";
import {Month} from "../model/month";

@Injectable()
export class FilterService {

  constructor() { }

  getEvents(): string[] {
    return ["Oltás", "Általános vizsgálat"]
  }

  getDaysOfWeeksForEvent(event: string, month: Month): Week[] {
    return month.weeks.map(
      (week: Week) => {
        week.days = week.days
          .filter((day: Day) => day.slots
            .find((slot: Slot) => slot.reservableFor
              .includes(event)) != null);
        week.days.forEach((day: Day) => {
          day.slots = day.slots
            .filter((slot: Slot) => new Date().getTime() <= slot.date.getTime())
        });
        week.days.filter((day: Day) => day.slots.length > 0);
        return week;
      });
  }

  getSlotsForDay(event: string, day: Day): Slot[] {
    return day.slots.filter((slot: Slot) => slot.reservableFor.includes(event));
  }
}



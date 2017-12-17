import { Injectable } from '@angular/core';
import {Slot} from "../model/slot";
import {Reservation} from "../model/backend/calendar/reservation";
import {Addition} from "../model/backend/calendar/addition";
import {Holiday} from "../model/backend/calendar/holiday";
import {Restriction} from "../model/backend/calendar/restriction";

@Injectable()
export class FilterService {

  constructor() { }

  getEvents(): string[] {
    return ["Oltás", "Általános vizsgálat"]
  }

  getDays(
    event: string,
    additions: Addition[],
    holidays: Holiday[],
    restrictions: Restriction[],
    reservations: Reservation[]): Date[] {
    let currentDay = new Date();
    let days = [];
    for (let i=0; i<21; i++) {
      let diff = i * 24*60*60*1000;
      let day = new Date(currentDay.getTime() + diff);
      day.setHours(12, 0, 0);
      days.push(day);
    }
    if (event == "Oltás") {
      days = days.filter(day => this.hasV(day, additions, holidays, restrictions, reservations))
    }
    if (event == "Általános vizsgálat") {
      days = days.filter(day => this.hasR(day, additions, holidays, restrictions, reservations))
    }
    return days;
  }

  getSlots(
    event: string,
    day: Date,
    reservations: Reservation[],
    additions: Addition[]): Slot[] {
    let slots = [];
    let date = new Date(day.getTime())
    date.setHours(8)
    for (let i=0; i<48; i++) {
      let diff = 1000*60*15 * i;
      let current = new Date(date.getTime() + diff);
      slots.push(new Slot(current));
    }
    return slots.filter(s => this.possibleSlot(s, event, reservations, additions));
  }

  private hasV(day: Date, additions: Addition[], holidays: Holiday[], restrictions: Restriction[], reservations: Reservation[]) {
    let isHoliday = holidays.find(h => new Date(h.date).getDate() == day.getDate()) != null;
    if (isHoliday) { return false; }
    let isNormallyGood = day.getDay() == 2 || day.getDay() == 3;
    if (isNormallyGood) {
      let noRestriction = restrictions
        .filter(r => new Date(r.date).getDate() == day.getDate()).length == 0;
      if (noRestriction) {
        let hasFreeSpace = reservations
          .filter(r => new Date(r.date).getDate() == day.getDate())
          .filter(r => r.event == "Oltás").length < 8;
        return hasFreeSpace;
      } else { return false; }
    } else {
      let couldBeGood = day.getDay() == 4;
      if (couldBeGood) {
        let tooLate = day.getDate() - 2 <= new Date().getDate();
        if (tooLate) { return false; }
        let noRestriction = restrictions
          .filter(r => new Date(r.date).getDate() == day.getDate()).length == 0;
        if (noRestriction) {
          let relatedTue = new Date(day.getTime() - 1000*60*60*24*2);
          let relatedTuePossible = this.hasV(relatedTue, additions, holidays, restrictions, reservations)
          let relatedWed = new Date(day.getTime() - 1000*60*60*24);
          let relatedWedPossible = this.hasV(relatedWed, additions, holidays, restrictions, reservations)
          return !(relatedTuePossible || relatedWedPossible)
        } else { return false; }
      } else {
        let noChance = day.getDay() == 1 || day.getDay() == 5;
        if (noChance) { return false; }
        let hasAddition = additions.find(a => new Date(a.date).getDate() == day.getDate()) != null;
        if (hasAddition) {
          let addition = additions
            .find(a => new Date(a.date).getDate() == day.getDate());
          let fullProperAddition = addition.schemaName == "Kedd" || addition.schemaName == "Szerda";
          if (fullProperAddition) {
            let noRestriction = restrictions
              .filter(r => new Date(r.date).getDate() == day.getDate()).length == 0;
            if (noRestriction) {
              let hasFreeSpace = reservations
                .filter(r => new Date(r.date).getDate() == day.getDate())
                .filter(r => r.event == "Oltás").length < 8;
              return hasFreeSpace;
            } else {
              return false;
            }
          } else {
            let maybeProperAddition = addition.schemaName == "Csütörtök";
            if (maybeProperAddition) {
              let noRestriction = restrictions
                .filter(r => new Date(r.date).getDate() == day.getDate()).length == 0;
              if (noRestriction) {
                // never gonna happen...probably...could be true...
                return false;
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      }
    }
  }

  private hasR(day: Date, additions: Addition[], holidays: Holiday[], restrictions: Restriction[], reservations: Reservation[]) {
    let isHoliday = holidays.find(h => new Date(h.date).getDate() == day.getDate()) != null;
    if (isHoliday) { return false; }
    let numberOfReservations = reservations
      .filter(r => new Date(r.date).getDate() == day.getDate())
      .filter(r => r.event == "Általános vizsgálat")
      .length;
    if (day.getDay() == 1) {
      return numberOfReservations < 16;
    }
    if (day.getDay() == 2) {
      return numberOfReservations < 8;
    }
    if (day.getDay() == 3) {
      return numberOfReservations < 8;
    }
    if (day.getDay() == 4) {
      return numberOfReservations < 16;
    }
    if (day.getDay() == 5) {
      return numberOfReservations < 16;
    }
    let relatedAddition = additions.find(a => new Date(a.date).getDate() == day.getDate());
    if (relatedAddition == null) { return false; }
    if (relatedAddition.schemaName == "Szerda" || relatedAddition.schemaName == "Kedd") {
      return numberOfReservations < 8;
    }
    return numberOfReservations < 16;
  }

  private possibleSlot(slot: Slot, event: string, reservations: Reservation[], additions: Addition[]): boolean {
    let afterNow = slot.date.getTime() > new Date().getTime();
    if (!afterNow) { return false; }
    let relatedReservation = reservations.find(
      r => new Date(r.date).getHours() == slot.date.getHours() && new Date(r.date).getMinutes() == slot.date.getMinutes());
    let noReservation = relatedReservation == null;
    if (!noReservation) { return false; }
    if (event == "Oltás") {
      if (slot.date.getDay() == 2) {
        return 13 < slot.date.getHours() && slot.date.getHours() < 16;
      }
      if (slot.date.getDay() == 3) {
        return 7 < slot.date.getHours() && slot.date.getHours() < 10;
      }
      if (slot.date.getDay() == 4) {
        return 13 < slot.date.getHours() && slot.date.getHours() < 16;
      }
      let relatedAddition = additions.find(a => new Date(a.date).getDate() == slot.date.getDate());
      if (relatedAddition.schemaName == "Szerda") {
        return 7 < slot.date.getHours() && slot.date.getHours() < 10;
      }
      return 13 < slot.date.getHours() && slot.date.getHours() < 16;
    }
    if (event == "Általános vizsgálat") {
      if (slot.date.getDay() == 1) {
        return 15 < slot.date.getHours() && slot.date.getHours() < 20;
      }
      if (slot.date.getDay() == 2) {
        return 15 < slot.date.getHours() && slot.date.getHours() < 18;
      }
      if (slot.date.getDay() == 3) {
        return 9 < slot.date.getHours() && slot.date.getHours() < 12;
      }
      if (slot.date.getDay() == 4) {
        return 13 < slot.date.getHours() && slot.date.getHours() < 18;
      }
      if (slot.date.getDay() == 5) {
        let isOdd = this.isOdd(slot.date);
        if (isOdd) {
          return 7 < slot.date.getHours() && slot.date.getHours() < 12;
        }
        return 13 < slot.date.getHours() && slot.date.getHours() < 18;
      }
      let relatedAddition = additions.find(a => new Date(a.date).getDate() == slot.date.getDate());
      if (relatedAddition.schemaName == "Hétfő") {
        return 15 < slot.date.getHours() && slot.date.getHours() < 20;
      }
      if (relatedAddition.schemaName == "Kedd") {
        return 15 < slot.date.getHours() && slot.date.getHours() < 18;
      }
      if (relatedAddition.schemaName == "Szerda") {
        return 9 < slot.date.getHours() && slot.date.getHours() < 12;
      }
      if (relatedAddition.schemaName == "Csütörtök") {
        return 13 < slot.date.getHours() && slot.date.getHours() < 18;
      }
      if (relatedAddition.schemaName == "Péntek(1)") {
        return 7 < slot.date.getHours() && slot.date.getHours() < 12;
      }
      if (relatedAddition.schemaName == "Péntek(2)") {
        return 13 < slot.date.getHours() && slot.date.getHours() < 18;
      }
    }
  }

  private isOdd(day: Date): boolean {
    let date = new Date(day.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    return (1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7)) % 2 == 1;
  }
}



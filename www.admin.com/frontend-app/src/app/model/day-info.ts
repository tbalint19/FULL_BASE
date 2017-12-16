import {Addition} from "./backend/calendar/addition";
import {Restriction} from "./backend/calendar/restriction";
import {Holiday} from "./backend/calendar/holiday";
import {Reservation} from "./backend/calendar/reservation";
import {Slot} from "./slot";
import {DaySchema} from "./day-schema";

export class DayInfo {

  public schemaName: string;

  public date: Date;

  public addition: Addition;
  public restriction: Restriction;
  public holiday: Holiday;
  public slots: Slot[];

  constructor(day: Date, schema: DaySchema) {
    this.schemaName = schema.name;
    this.slots = [];
    this.date = day;
    this.assignSlots(day, schema);
  }

  assignSlots(day: Date, schema: DaySchema): void {
    let startDate = new Date();
    startDate.setTime(day.getTime());
    startDate.setHours(schema.start, 0, 0);
    for (let x=0; x<(schema.active ? 16 : 0); x++) {
      let timeStamp = new Date();
      timeStamp.setTime(startDate.getTime());
      timeStamp.setHours(startDate.getHours());
      timeStamp.setMinutes(startDate.getMinutes() + x*15);
      let isVaccinateTime = schema.startsWithVaccinate && x < 8;
      this.slots.push(new Slot(timeStamp, isVaccinateTime));
    }
  }
}

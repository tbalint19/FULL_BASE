import {DayInfo} from "./day-info";
import {DaySchema} from "./day-schema";

export class WeeklyData {

  public days: DayInfo[];

  public static DAY_SCHEMAS = [
    new DaySchema("Hétfő", 16, true, false),
    new DaySchema("Kedd", 14, true, true),
    new DaySchema("Szerda", 8, true, true),
    new DaySchema("Csütörtök", 14, true, true),
    new DaySchema("Péntek(1)", 8, true, false),
    new DaySchema("Péntek(2)", 16, true, false),
    new DaySchema("Szabad", 0, false, false),
  ];

  constructor(monday: Date) {
    let mondayData = new Date(monday.getTime());
    mondayData.setHours(12);
    this.days = [];
    let weekDaysDates = this.getWeekDaysDates(mondayData);
    let weekIsOdd = this.weekIsOdd(mondayData);
    for (let dayNumber=0; dayNumber<7; dayNumber++) {
      let day = weekDaysDates[dayNumber];
      let schema = WeeklyData.FIND_SCHEMA(dayNumber, weekIsOdd);
      this.days.push(new DayInfo(day, schema));
    }
  }

  static GET_SCHEMA(name: string): DaySchema {
    return WeeklyData.DAY_SCHEMAS.find(schema => schema.name == name);
  }

  static FIND_SCHEMA(dayNumber: number, isOdd: boolean): DaySchema {
    switch (dayNumber) {
      case 0:
        return WeeklyData.GET_SCHEMA("Hétfő");
      case 1:
        return WeeklyData.GET_SCHEMA("Kedd");
      case 2:
        return WeeklyData.GET_SCHEMA("Szerda");
      case 3:
        return WeeklyData.GET_SCHEMA("Csütörtök");
      case 4:
        return isOdd ? WeeklyData.GET_SCHEMA("Péntek(1)") : WeeklyData.GET_SCHEMA("Péntek(2)");
      default:
        return WeeklyData.GET_SCHEMA("Szabad");
    }
  }

  private getWeekDaysDates(monday: Date): Date[] {
    let week = [];
    for (let i=0; i<7; i++){
      let day = new Date();
      day.setTime(monday.getTime() + 1000*60*60*24*i);
      week.push(day);
    }
    return week;
  }

  private weekIsOdd(monday: Date): boolean {
    return this.getWeekNumber(monday) % 2 == 1;
  }

  private getWeekNumber(date: Date): number {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7);
  }
}

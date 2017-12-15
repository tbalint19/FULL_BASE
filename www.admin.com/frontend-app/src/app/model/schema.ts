import {DayInfo} from "./day-info";

export class Schema {

  public monday: DayInfo;
  public tuesday: DayInfo;
  public wednesday: DayInfo;
  public thursday: DayInfo;
  public friday: DayInfo;
  public saturday: DayInfo;
  public sunday: DayInfo;

  constructor(isOdd: boolean) {
    this.monday = new DayInfo("Monday");
    this.tuesday = new DayInfo("Tuesday");
    this.wednesday = new DayInfo("Wednesday");
    this.thursday = new DayInfo("Thursday");
    this.friday = new DayInfo(isOdd ? "OddFriday" : "EvenFriday");
    this.saturday = new DayInfo();
    this.sunday = new DayInfo();
  }

  asList() {
    return [
      this.monday, this.tuesday, this.wednesday, this.thursday, this.friday,
      this.saturday, this.sunday
    ]
  }
}

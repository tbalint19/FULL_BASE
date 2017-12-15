export class DayInfo {

  public start: number;

  public length: number;

  public vaccinateStart: number;

  public vaccinateLength: number;

  constructor(dayName?: string) {
    switch (dayName) {
      case "Monday":
        this.start = 16;
        this.length = 16;
        this.vaccinateStart = null;
        this.vaccinateLength = 0;
        break;
      case "Tuesday":
        this.start = 16;
        this.length = 16;
        this.vaccinateStart = null;
        this.vaccinateLength = 8;
        break;
      case "Wednesday":
        this.start = 16;
        this.length = 16;
        this.vaccinateStart = null;
        this.vaccinateLength = 8;
        break;
      case "Thursday":
        this.start = 16;
        this.length = 16;
        this.vaccinateStart = null;
        this.vaccinateLength = 8;
        break;
      case "OddFriday":
        this.start = 16;
        this.length = 16;
        this.vaccinateStart = null;
        this.vaccinateLength = 0;
        break;
      case "EvenFriday":
        this.start = 16;
        this.length = 16;
        this.vaccinateStart = null;
        this.vaccinateLength = 0;
        break;
      default:
        this.start = null;
        this.length = 0;
        this.vaccinateStart = null;
        this.vaccinateLength = 0;
        break;
    }
  }
}

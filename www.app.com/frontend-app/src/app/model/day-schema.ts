export class DaySchema {

  public name: string;

  public regularStart: number;

  public vaccinateStart: number;

  public regularTime: number;

  public vaccinateTime: number;

  constructor(name: string, regularStart: number, regularTime: number, vaccinateStart: number, vaccinateTime: number) {
    this.name = name;
    this.regularStart = regularStart;
    this.vaccinateStart = vaccinateStart;
    this.regularTime = regularTime;
    this.vaccinateTime = vaccinateTime;
  }
}

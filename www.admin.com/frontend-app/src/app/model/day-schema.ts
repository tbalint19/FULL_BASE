export class DaySchema {

  public name: string;

  public start: number;

  public active: boolean;

  public startsWithVaccinate: boolean;

  constructor(
    name: string, start: number, active: boolean, startsWithVaccinate: boolean) {
    this.name = name;
    this.start = start;
    this.active = active;
    this.startsWithVaccinate = startsWithVaccinate;
  }
}

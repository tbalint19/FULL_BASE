export class StartParams {

  public start: number;

  constructor(date: Date) {
    this.start = date.getTime();
  }
}

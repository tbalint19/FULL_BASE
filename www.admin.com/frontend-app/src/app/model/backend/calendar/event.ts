export class Event {

  public id: number;
  public name: string;
  public requiredNumberOfSpots: number;
  public events: Event[];
  public available: boolean;
}

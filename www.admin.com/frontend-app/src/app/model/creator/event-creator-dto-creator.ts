export class EventCreatorDtoCreator {

  public id: number;

  public name: string;

  public requiredNumberOfSpots: number;

  constructor(){
    this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  private initialize(): void {
    this.id = null;
    this.name = "";
    this.requiredNumberOfSpots = 1;
  }
}

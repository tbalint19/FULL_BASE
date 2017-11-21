export class MessageCreateDtoCreator {

  public message: string;

  constructor(){
    this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  private initialize(): void {
    this.message = "";
  }
}

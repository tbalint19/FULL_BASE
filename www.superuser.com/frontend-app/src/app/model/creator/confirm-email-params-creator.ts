export class ConfirmEmailParamsCreator {
  
  public credential: string;
  
  constructor(){
    this.initialize();
  }
  
  public reset(): void {
    this.initialize();
  }
  
  private initialize(): void {
    this.credential = "";
  }
}

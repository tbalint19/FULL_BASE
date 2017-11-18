export class ConfirmDtoCreator {
  
  public credential: string;
  public code: string;
  
  constructor(){
    this.initialize();
  }
  
  public reset(): void {
    this.initialize();
  }
  
  private initialize(): void {
    this.credential = "";
    this.code = "";
  }
}

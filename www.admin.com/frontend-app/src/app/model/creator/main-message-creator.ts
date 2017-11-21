export class MainMessageCreator {

  public id: number;
  public title: string;
  public text: string;
  public type: string;
  public identifier: string;

  constructor(){
   this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  private initialize(): void {
    this.id = null;
    this.title = "";
    this.text = "";
    this.type = "";
    this.identifier = "";
  }
}

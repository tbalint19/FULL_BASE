export class LoginDtoCreator {

  credential: string;
  password: string;

  constructor(){
    this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  private initialize(): void {
    this.credential = "";
    this.password = "";
  }
}

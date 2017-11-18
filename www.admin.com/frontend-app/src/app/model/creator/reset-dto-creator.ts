export class ResetDtoCreator {

  username: string;

  code: string;

  password: string;

  passwordAgain: string;

  constructor(){
    this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  private initialize(): void {
    this.username = "";
    this.code = "";
    this.password = "";
    this.passwordAgain = "";
  }
}

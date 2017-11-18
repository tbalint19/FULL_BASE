export class SignupDtoCreator {

  public username: string;
  public email: string;
  public password: string;
  public passwordAgain: string;

  constructor(){
    this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  private initialize(): void {
    this.username = "";
    this.email = "";
    this.password = "";
    this.passwordAgain = "";
  }
}

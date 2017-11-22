import {ApplicationUser} from "../backend/auth/application-user";

export class RespondDtoCreator {

  public user: ApplicationUser;

  public messageContent: string;

  constructor(){
    this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  public initialize(): void {
    this.user = null;
    this.messageContent = "";
  }
}

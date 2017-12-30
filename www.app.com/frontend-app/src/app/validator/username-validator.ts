import {Injectable} from "@angular/core";

@Injectable()
export class UsernameValidator {

  private usernamePattern: RegExp;

  constructor(){
    this.usernamePattern = /^([a-zA-Z0-9_-]){10,25}$/;
  }

  public validFormat(username: string): boolean {
    return username && (9 < username.length && username.length < 26);
  }
}

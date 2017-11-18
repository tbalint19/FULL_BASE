import {Injectable} from "@angular/core";
import jwtDecode from "jwt-decode";

@Injectable()
export class AuthStatus {

  constructor(){}

  public isAuthenticated(): boolean {
    return localStorage.getItem('auth-token') != null;
  }

  public isConfirmed(): boolean {
    return this.isAuthenticated() ? this.getSub() == "true" : false;
  }

  public getCredential(): string {
    return this.isAuthenticated() ? this.getAud() : null;
  }

  private getAud(): string {
    return jwtDecode(localStorage.getItem('auth-token'))['aud'];
  }

  private getSub(): string {
    return jwtDecode(localStorage.getItem('auth-token'))['sub'];
  }
}

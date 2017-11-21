import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import jwtDecode from "jwt-decode";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['start']);
    return false;
  }

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

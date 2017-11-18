import {Component, Input, OnInit} from '@angular/core';
import {TokenResponse} from "../../model/response/token-response";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {MessageService} from "../../service/message.service";
import {LoginStatus} from "../../status/login-status";
import {Error} from "../../model/message/error.model";
import {Success} from "../../model/message/success.model";

@Component({
  selector: 'login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit {

  constructor(
    private service: LoginService,
    protected status: LoginStatus,
    private messages: MessageService) { }

  ngOnInit() {
    this.status.creator.reset();
  }

  public attemptLogin(): void {
    if (!this.status.isPossible()){
      this.suspend();
      return;
    }
    this.service.attemptLogin(this.status.creator).subscribe(
      (response: TokenResponse) => this.handleLoginResponse(response.token)
    );
  }

  public suspend(): void {
    this.status.setSuspended(true);
    this.messages.add(new Error("Error", "Invalid login data"));
    setTimeout(()=>{
      this.status.setSuspended(false);
    }, 5000);
  }

  private handleLoginResponse(token: string){
    if (token) {
      this.handleSuccessfulLogin(token)
    } else {
      this.handleLoginError();
    }
  }

  private handleSuccessfulLogin(token: string): void {
    if (token != null) {
      localStorage.setItem('auth-token', token);
      this.messages.add(new Success("Successful login", "Welcome"));
    }
  }

  private handleLoginError(){
    this.messages.add(new Error("Invalid credentials", "Try again"));
  }
}

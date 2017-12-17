import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationDTO} from '../../model/dto/confirm-dto';
import {ConfirmService} from '../../service/confirm.service';
import {TokenResponse} from '../../model/response/token-response';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MessageService} from "../../service/message.service";
import {ConfirmStatus} from "../../status/confirm-status";
import {ConfirmEmailParams} from "../../model/params/confirm-email-params.model";
import {SuccessResponse} from "../../model/response/success-response";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";
import {AuthStatus} from "../../status/auth-status";

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input()
  public minified: boolean;

  constructor(
    private confirmService: ConfirmService,
    public status: ConfirmStatus,
    private authStatus: AuthStatus,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private messages: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.initializeCreators();
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params['code'] && params['user']) {
          this.attemptConfirmFromParams(params);
        }
      }
    );
    if (!this.status.confirmDtoCreator.credential) {
      this.router.navigate(['']);
    }
  }

  public attemptConfirm(): void {
    if (!this.status.isPossible()){
      this.suspendConfirm();
      return;
    }
    this.confirmService.attemptConfirm(this.status.confirmDtoCreator).subscribe(
      (response: TokenResponse) => this.handleConfirmResponse(response)
    );
  }

  public resendRequest(): void {
    this.confirmService.requestConfirm(this.status.confirmEmailParamsCreator).subscribe(
      (response: SuccessResponse) => this.handleResendResponse(response)
    );
  }

  private attemptConfirmFromParams(params: Params): void {
    this.location.replaceState('confirm');
    this.status.confirmDtoCreator.code = params['code'];
    this.status.confirmDtoCreator.credential = params['user'];
    this.attemptConfirm();
  }

  private suspendConfirm(): void {
    this.status.setSuspended(true);
    this.messages.add(new Error("Sikertelen", "Próbálkozás"));
    setTimeout(() => {
      this.status.setSuspended(false);
    }, 5000)
  }

  private handleResendResponse(response: SuccessResponse): void {
    if (response.successful){
      this.messages.add(new Success("Email", "Kiküldve"));
    } else {
      this.messages.add(new Error("Sikertelen", "Próbálkozás"));
    }
  }

  private handleConfirmResponse(response: TokenResponse): void {
    if (response.token) {
      this.handleSuccessfulConfirm(response.token);
    } else {
      this.handleFailedConfirm();
    }
  }

  private handleSuccessfulConfirm(token: string): void {
    localStorage.setItem('auth-token', token);
    this.messages.add(new Success("Fiók" , "Megerősítve"))
    this.router.navigate(['']);
  }

  private handleFailedConfirm(): void {
    this.messages.add(new Error("Sikertelen", "Próbálkozás"));
    localStorage.removeItem("aut-token");
    this.router.navigate([""]);
  }

  private initializeCreators(): void {
    this.status.confirmDtoCreator.reset();
    this.status.confirmEmailParamsCreator.reset();
    this.status.confirmDtoCreator.credential = this.authStatus.getCredential();
    this.status.confirmEmailParamsCreator.credential = this.authStatus.getCredential();
  }

}

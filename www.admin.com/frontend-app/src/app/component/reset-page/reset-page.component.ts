import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Location} from '@angular/common';
import {ResetService} from "../../service/reset.service";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {ResetStatus} from "../../status/reset-status";
import {Error} from "../../model/message/error.model";
import {Success} from "../../model/message/success.model";

@Component({
  selector: 'app-reset',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit {

  constructor(
    private resetService: ResetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messages: MessageService,
    protected status: ResetStatus,
    private location: Location) { }

  ngOnInit() {
    this.status.resetDtoCreator.reset();
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        if (params['code'] && params['user']) {
          this.initResetFromParams(params);
        } else {
          this.router.navigate(['']);
        }
      }
    );
  }

  public attemptReset(): void {
    if (!this.status.isPossible()) {
      this.suspend();
      return;
    }
    this.resetService.attemptReset(this.status.resetDtoCreator).subscribe(
      (response: SuccessResponse) => this.handleResetResponse(response.successful)
    )
  }

  private suspend(): void {
    this.messages.add(new Error("Hiba", "Sikertelen kísérlet"));
    this.status.setSuspended(true);
    setTimeout(()=>{
      this.status.setSuspended(false);
    }, 5000)
  }

  private initResetFromParams(params: Params): void {
    this.status.resetDtoCreator.username = params['user'];
    this.status.resetDtoCreator.code = params['code'];
    this.location.replaceState("reset");
  }

  private handleResetResponse(successful: boolean): void {
    if (successful) {
      this.handleSuccess();
    } else {
      this.handleError();
    }
  }

  private handleSuccess(): void {
    this.messages.add(new Success("Sikeresen", "Átállítva"));
    this.router.navigate(['start']);
  }

  private handleError(): void {
    this.messages.add(new Error("Hiba", "Sikertelen kísérlet"));
  }

}

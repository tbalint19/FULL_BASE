import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";
import {Router} from "@angular/router";
import {InfoService} from "../../service/info.service";
import {HomeStatus} from "../../status/home-status";
import {MainMessage} from "../../model/backend/info/main-message";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    protected status: HomeStatus,
    protected authStatus: AuthStatus,
    private service: InfoService) { }

  ngOnInit() {
    // this.service.getMainMessage().subscribe(
    //   (message: MainMessage) => this.status.message = message
    // );
  }

}

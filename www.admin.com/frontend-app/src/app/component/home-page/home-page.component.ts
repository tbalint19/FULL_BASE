import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";
import {HttpClient} from "../../http/http.client";

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(protected authStatus: AuthStatus, private client: HttpClient) { }

  ngOnInit() {
  }

}

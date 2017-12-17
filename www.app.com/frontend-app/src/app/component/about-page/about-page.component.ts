import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(public authStatus: AuthStatus) { }

  ngOnInit() {
  }

}

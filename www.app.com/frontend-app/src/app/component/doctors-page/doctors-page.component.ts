import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.css']
})
export class DoctorsPageComponent implements OnInit {

  constructor(protected authStatus: AuthStatus) { }

  ngOnInit() {
  }

}

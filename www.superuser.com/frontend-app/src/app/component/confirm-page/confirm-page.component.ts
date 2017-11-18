import { Component, OnInit } from '@angular/core';
import {ConfirmStatus} from "../../status/confirm-status";

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent implements OnInit {

  constructor(protected status: ConfirmStatus) { }

  ngOnInit() {
  }

}

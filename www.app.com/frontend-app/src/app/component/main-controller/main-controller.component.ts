import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'main-controller',
  templateUrl: './main-controller.component.html',
  styleUrls: ['./main-controller.component.css']
})
export class MainControllerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public redirect(route: string): void {
    this.router.navigate([route]);
  }

}

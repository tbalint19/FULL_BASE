import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'welcome-content',
  templateUrl: './welcome-content.component.html',
  styleUrls: ['./welcome-content.component.css']
})
export class WelcomeContentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public redirect(route: string): void {
    this.router.navigate([route]);
  }

}

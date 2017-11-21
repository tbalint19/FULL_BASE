import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard-element',
  templateUrl: './dashboard-element.component.html',
  styleUrls: ['./dashboard-element.component.css']
})
export class DashboardElementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  @Input()
  public route: string;

  @Input()
  public icon: string;

  @Input()
  public text: string;

  protected redirect(): void {
    this.router.navigate([this.route]);
  }

}

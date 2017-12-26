import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";
import {AboutStatus} from "../../status/about-status";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(public authStatus: AuthStatus, public status: AboutStatus) { }

  ngOnInit() {
    this.status.reset();
  }

  public selectSite(site: string): void {
    this.status.selectedSite = site;
  }

  public isSelected(site: string): boolean {
    return site == this.status.selectedSite;
  }

}

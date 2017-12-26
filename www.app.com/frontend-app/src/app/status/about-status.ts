import {Injectable} from "@angular/core";

@Injectable()
export class AboutStatus {

  public sites: string[];

  public selectedSite: string;

  constructor() {
    this.sites = ["Rólam", "Rendelő", "Helyettesítés", "Recepció", "Labor", "Szakrendelések"]
  }

  public reset(): void {
    this.selectedSite = "Rólam";
  }
}

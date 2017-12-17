import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.css']
})
export class DoctorsPageComponent implements OnInit {

  public searchString: string;

  public data: string[] = [];

  constructor(public authStatus: AuthStatus) {
    this.searchString = "";
  }

  ngOnInit() {
    this.initData();
  }

  filteredList(): string[] {
    return this.data.filter(row => row.includes(this.searchString));
  }

  displayStreet(data: string): string {
    return data.split(" - ")[0];
  }

  displayName(data: string): string {
    return data.split(" - ")[1];
  }

  private initData(): void {
    this.data = [
      "Árpád utca - Fekete Nóra",
      "Batthyány utca 1-55. 2-56. - Fekete Nóra",
      "Béla utca 1-57. 2-90. - Fekete Nóra",
      "Bőség utca - Fekete Nóra",
      "Budapesti utca 1-33. 2-60. 94-104. - Fekete Nóra",
      "Csillag utca - Fekete Nóra",
      "Aulich utca 1-57. 2-50. - Kerepeczki Ágnes",
      "Aurél utca 1-13. 2-14. - Kerepeczki Ágnes",
      "Baross utca 106-166. 115-169. - Kerepeczki Ágnes",
      "Csömöri utca 144-182. - Kerepeczki Ágnes",
      "Akácfa utca 65-137. 54-112. - Hegedűs Ágnes",
      "Attila utca 65-145. 68-146. - Hegedűs Ágnes",
      "Baross utca 168-228. 171-235. - Hegedűs Ágnes",
    ]
  }

}

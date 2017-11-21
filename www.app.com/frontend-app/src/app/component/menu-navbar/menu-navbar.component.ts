import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "../../service/message.service";
import {Note} from "../../model/message/note.model";

@Component({
  selector: 'menu-navbar',
  templateUrl: './menu-navbar.component.html',
  styleUrls: ['./menu-navbar.component.css']
})
export class MenuNavbarComponent implements OnInit {

  constructor(private router: Router, private messages: MessageService) { }

  ngOnInit() {
    sessionStorage.removeItem("credential");
  }

  redirect(route: string): void {
    this.router.navigate([route]);
  }

  logout(){
    localStorage.removeItem("auth-token");
    this.messages.add(new Note("Sikeres", "Kijelentkezés"));
    this.router.navigate(['start']);
  }
}

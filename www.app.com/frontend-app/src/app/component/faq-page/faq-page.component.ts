import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";
import {FaqService} from "../../service/faq.service";
import {FaqStatus} from "../../status/faq-status";
import {Faq} from "../../model/backend/faq/faq";
import {HttpClient} from "../../http/http.client";

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  constructor(
    public client: HttpClient,
    public authStatus: AuthStatus,
    private service: FaqService,
    public status: FaqStatus) { }

  ngOnInit() {
    this.getFaqs();
  }

  getFaqs(): void {
    this.service.getFaqs().subscribe(
      (faqs: Faq[]) => this.status.faqs = faqs
    );
  }

  select(faq: Faq): void {
    this.status.selected = faq;
  }

  numberOfPictures(faq: Faq): number {
    return [faq.picture1name, faq.picture2name].filter(p => p != null).length;
  }

  getOneImage(faq: Faq): string {
    return [faq.picture1name, faq.picture2name].find(p => p != null);
  }

}

import { Component, OnInit } from '@angular/core';
import {FaqStatus} from "../../status/faq-status";
import {FaqService} from "../../service/faq.service";
import {Faq} from "../../model/backend/faq/faq";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";
import {HttpClient} from "../../http/http.client";

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  constructor(
    public client: HttpClient,
    private messages: MessageService,
    public status: FaqStatus,
    private service: FaqService) { }

  ngOnInit() {
    this.getFaqs();
    this.getImageNames();
  }

  getImageNames(): void {
    this.service.getImageNames().subscribe(
      (imageNames: string[]) => this.status.imageNames = imageNames
    );
  }

  getFaqs(): void {
    this.service.getAll().subscribe(
      (faqs: Faq[]) => this.status.faqs = faqs
    );
  }

  openEditor(faq?: Faq): void {
    this.getImageNames();
    this.status.selectedFaq = faq ? faq : new Faq();
    this.status.editorActive = true;
  }

  saveFaq(): void {
    this.service.create(this.status.selectedFaq).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  deleteFaq(): void {
    this.service.delete(this.status.selectedFaq).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  handleResponse(response: SuccessResponse): void {
    if (response && response.successful) {
      this.messages.add(new Success("Sikeresen", "Mentve"));
      this.getFaqs();
      this.getImageNames();
      this.status.editorActive = false;
    } else {
      this.messages.add(new Error("Ooops", "Próbálja újra"));
    }
  }

}

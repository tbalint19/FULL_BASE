import { Component, OnInit } from '@angular/core';
import {FaqStatus} from "../../status/faq-status";
import {FaqService} from "../../service/faq.service";
import {Faq} from "../../model/backend/faq/faq";
import {SuccessResponse} from "../../model/response/success-response";
import {MessageService} from "../../service/message.service";
import {Success} from "../../model/message/success.model";
import {Error} from "../../model/message/error.model";

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  protected image: any;

  constructor(
    private messages: MessageService,
    protected status: FaqStatus,
    private service: FaqService) { }

  ngOnInit() {
    this.getFaqs();
  }

  protected getFaqs(): void {
    this.service.getAll().subscribe(
      (faqs: Faq[]) => this.status.faqs = faqs
    );
  }

  protected openEditor(faq?: Faq): void {
    this.status.selectedFaq = faq ? faq : new Faq();
    this.status.editorActive = true;
  }

  protected onFileAdded(event, number): void {
    // let reader = new FileReader();
    // if(event.target.files && event.target.files.length > 0) {
    //   let file = event.target.files[0];
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     if (number == 1) {
    //       this.status.selectedFaq.picture1 = reader.result.split(',')[1];
    //     } else {
    //       this.status.selectedFaq.picture2 = reader.result.split(',')[1];
    //     }
    //   };
    // }
  }

  protected saveFaq(): void {
    this.service.create(this.status.selectedFaq).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }



  protected deleteFaq(): void {
    this.service.delete(this.status.selectedFaq).subscribe(
      (response: SuccessResponse) => this.handleResponse(response)
    );
  }

  private handleResponse(response: SuccessResponse): void {
    if (response && response.successful) {
      this.messages.add(new Success("Sikeresen", "Mentve"));
      this.getFaqs();
      this.status.editorActive = false;
    } else {
      this.messages.add(new Error("Ooops", "Próbálja újra"));
    }
  }

}

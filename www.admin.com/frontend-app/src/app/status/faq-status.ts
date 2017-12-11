import {Injectable} from "@angular/core";
import {Faq} from "../model/backend/faq/faq";

@Injectable()
export class FaqStatus {

  public faqs: Faq[];

  public selectedFaq: Faq;

  public editorActive: boolean;

  constructor() {
    this.faqs = [];
    this.editorActive = false;
  }
}

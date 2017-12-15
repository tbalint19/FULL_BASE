import {Injectable} from "@angular/core";
import {Faq} from "../model/backend/faq/faq";

@Injectable()
export class FaqStatus {

  public faqs: Faq[];

  public selectedFaq: Faq;

  public editorActive: boolean;

  public imageNames: string[];
  public preview: string;

  constructor() {
    this.faqs = [];
    this.imageNames = [];
    this.editorActive = false;
    this.preview = null;
  }
}

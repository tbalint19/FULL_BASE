import {Injectable} from "@angular/core";
import {Faq} from "../model/backend/faq/faq";

@Injectable()
export class FaqStatus {

  public faqs: Faq[];

  public selected: Faq;

  constructor(){
    this.faqs = [];
    this.selected = null;
  }
}

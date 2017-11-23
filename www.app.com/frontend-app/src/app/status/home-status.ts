import {Injectable} from "@angular/core";
import {MainMessage} from "../model/backend/info/main-message";

@Injectable()
export class HomeStatus {
  
  public message: MainMessage;
  
  constructor(){
    this.message = null;
  }
}

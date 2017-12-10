import {Injectable} from "@angular/core";

@Injectable()
export class MainMessageValidator {

  private _validcontent: RegExp;
  private _identifierPattern: string;
  private _identifierPatternCalendar: string;

  constructor(){
    this._validcontent = /^([a-zA-Z0-9_-]){5,25}$/;
    this._identifierPattern = "home-message";
    this._identifierPatternCalendar = "calendar-message";
  }

  public isValidContent(content: string): boolean {
    return content.match(this._validcontent) != null;
  }

  public onlyOneIsUpdated(identifier: string): boolean {
    return identifier == this._identifierPattern;
  }

  public calendarIsUpdated(identifier: string): boolean {
    return identifier == this._identifierPatternCalendar;
  }
}

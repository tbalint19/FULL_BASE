import {Event} from "../../model/backend/calendar/event";

export class OrderDayDtoCreator {

  public date: number;

  public events: Event[];

  public times: number[];

  constructor(){
    this.initialize();
  }

  public reset(): void {
    this.initialize();
  }

  public initialize(): void {
    this.date = null;
    this.events = [];
    this.times = [];
  }
}

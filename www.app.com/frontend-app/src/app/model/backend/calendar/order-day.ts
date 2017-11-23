import {Slot} from "./slot";
import {Event} from "./event";

export class OrderDay {

  public id: number;
  public date: Date;
  public slots: Slot[];
  public events: Event[]
}

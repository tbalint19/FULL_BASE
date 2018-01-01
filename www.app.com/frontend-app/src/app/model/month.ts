import {Week} from "./week";
import {Day} from "./day";
import _ from 'lodash';

export class Month {

  public weeks: Week[];

  public getDays(): Day[] {
    return _.flatten(this.weeks.map((week: Week) => week.days));
  }

}

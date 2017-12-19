import {Channel} from "../message/channel";

export class ApplicationUser {

  public id: number;

  public username: string;

  public email: string;

  public channel: Channel;

  private constructor(){}
}

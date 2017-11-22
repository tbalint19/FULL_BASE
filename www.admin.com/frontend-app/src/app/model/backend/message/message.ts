import {Channel} from "./channel";

export class Message {

  public id: number;

  public text: string;

  public channel: Channel;

  public isUserMessage: boolean;

  public created: number;

  private constructor(){}
}

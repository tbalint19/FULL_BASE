import { Injectable } from '@angular/core';

@Injectable()
export class DatePrinter {

  constructor() { }

  showDateTime(_date: Date): string {
    let date = new Date(_date);
    return (date.getMonth()+1) + "." + date.getDate() + " (" + date.getHours() + ":" + date.getMinutes() + ")";
  }

  printDayName(day: number): string {
    switch (day){
      case 0: return "Vasárnap";
      case 1: return "Hétfő";
      case 2: return "Kedd";
      case 3: return "Szerda";
      case 4: return "Csütörtök";
      case 5: return "Péntek";
      case 6: return "Szombat";
    }
  }

  printHours(hour: number): string {
    return hour.toString().length == 1 ? "0" +  hour.toString() : hour.toString();
  }

  printMinutes(minute: number): string {
    return minute.toString().length == 1 ? "0" +  minute.toString() : minute.toString();
  }

  printDate(day: Date, isSelected: boolean): string {
    return !isSelected ? day.getDate().toString() :
      day.getFullYear().toString() + "." + (day.getMonth()+1).toString() + "." + day.getDate().toString();
  }

}

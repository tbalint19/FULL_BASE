import { Injectable } from '@angular/core';

@Injectable()
export class DatePrinterService {

  constructor() { }

  showDate(date: Date): string {
    date = new Date(date);
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let dayName = this.showDayName(date.getDay());
    return "" + month + "." + day + " (" + dayName + ")";
  }

  showTime(date: Date): string {
    date = new Date(date);
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return "" + hours + ":" + minutes;
  }

  private showDayName(dayNumber: number): string {
    switch (dayNumber) {
      case 0:
        return "Vasárnap";
      case 1:
        return "Hétfő";
      case 2:
        return "Kedd";
      case 3:
        return "Szerda";
      case 4:
        return "Csütörtök";
      case 5:
        return "Péntek";
      case 6:
        return "Szombat";
    }
  }
}

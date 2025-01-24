import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatPlayer'
})
export class TimeFormatPlayerPipe implements PipeTransform {

  transform(seconds: number): string {
    if (!seconds && seconds !== 0) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hoursString = this.pad(hours) ;
    const minutesString = this.pad(minutes);
    const secondsString = this.pad(secs);

    return `${hoursString}:${minutesString}:${secondsString}`;
  }
  
  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

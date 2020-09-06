import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progressFormatter',
})
export class ProgressFormatterPipe implements PipeTransform {

  transform(completedAmount: number, possibleAmount: number): string {
    if (!completedAmount || !possibleAmount) {
      return '';
    }

    const percentage = completedAmount / possibleAmount * 100;

    // if the percentage is low enough, don't print the numbers, just use the percentage
    // TODO why?
    if (percentage < 18) {
      return percentage + '%';
    }

    return '' + completedAmount + ' / ' + possibleAmount + ' (' + percentage + '%)';
  }

}

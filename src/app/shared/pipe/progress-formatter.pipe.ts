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

    return '' + completedAmount + ' / ' + possibleAmount + ' (' + percentage + '%)';
  }

}

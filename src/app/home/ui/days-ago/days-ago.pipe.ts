import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysAgo',
})
export class DaysAgoPipe implements PipeTransform {
  transform(value: string): string {
    const now = new Date();
    const takenDate = new Date(value);
    const oneDayInMinutes = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((takenDate.getTime() - now.getTime()) / oneDayInMinutes)
    );

    if (diffDays === 0) {
      return 'today';
    } else if (diffDays === 1) {
      return 'yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  }
}

@NgModule({
  declarations: [DaysAgoPipe],
  exports: [DaysAgoPipe],
})
export class DaysAgoPipeModule {}
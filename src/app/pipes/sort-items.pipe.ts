import { Pipe, PipeTransform } from '@angular/core';
import { IncomeRevenue } from '../models/income-revenue.model';

@Pipe({
  name: 'sortItems'
})
export class SortItemsPipe implements PipeTransform {

  transform(items: IncomeRevenue[]): IncomeRevenue[] {
    return items.sort((a, b) => {
      if(a.type === 'Ingreso'){
        return -1;
      } else {
        return 1;
      }
    });
  }

}

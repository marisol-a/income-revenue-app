import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { IncomeRevenue } from '../../models/income-revenue.model';
import { AppStateWithIncome } from '../income.revenue.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit, OnDestroy {
  income: number = 0;
  expenses: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;
  itemsSubs: Subscription;

  constructor(private store: Store<AppStateWithIncome>) {}

  ngOnInit(): void {
    this.itemsSubs = this.store
      .select('incomeRevenue')
      .pipe(filter(({ items }) => items !== null))
      .subscribe(({ items }) => {
        this.generateStatistics(items);
      });
  }

  ngOnDestroy(): void {
    this.itemsSubs.unsubscribe();
  }

  generateStatistics(items: IncomeRevenue[]) {
    this.income = items.filter((items) => items.type === 'Ingreso').length;

    this.expenses = items.filter((items) => items.type === 'Egreso').length;

    this.totalIncome = items
      .filter((items) => items.type === 'Ingreso')
      .reduce((acc, item) => acc + item.amount, 0);

    this.totalExpenses = items
      .filter((items) => items.type === 'Egreso')
      .reduce((acc, item) => acc + item.amount, 0);
  }
}

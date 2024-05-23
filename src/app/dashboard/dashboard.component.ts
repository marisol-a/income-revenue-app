import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription } from 'rxjs';
import { IncomeRevenueService } from '../services/income-revenue.service';
import * as incomeRevenueActions from '../income-revenue/income-revenue.actions';
import { IncomeRevenue } from '../models/income-revenue.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  incomeRevenueSubs: Subscription;

  constructor(
    private incomeRevenueService: IncomeRevenueService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.incomeRevenueSubs = this.incomeRevenueService
          .initIncomeRevenue(user.uid)
          .subscribe((items) => {
            this.store.dispatch(
              incomeRevenueActions.setItems({ items: [...items] })
            );
          });
      });
  }

  ngOnDestroy(): void {
    this.incomeRevenueSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }
}

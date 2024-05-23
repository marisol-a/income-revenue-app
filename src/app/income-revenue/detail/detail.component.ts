import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IncomeRevenue } from '../../models/income-revenue.model';
import { Subscription } from 'rxjs';
import { IncomeRevenueService } from '../../services/income-revenue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy {
  incomerevenueSubs: Subscription;
  incomeRevenue: IncomeRevenue[];

  constructor(
    private store: Store<AppState>,
    private incomeRrevenueService: IncomeRevenueService
  ) {}

  ngOnInit(): void {
    this.incomerevenueSubs = this.store
      .select('incomeRevenue')
      .subscribe(({ items }) => {
        this.incomeRevenue = items;
      });
  }

  ngOnDestroy(): void {
    this.incomerevenueSubs.unsubscribe();
  }

  deleteItem(uid: string) {
    this.incomeRrevenueService
      .deteleIncomeExpense(uid)
      .then(() => {
        Swal.fire('Item eliminado', '', 'success');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }
}

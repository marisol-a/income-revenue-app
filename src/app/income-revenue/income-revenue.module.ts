import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { IncomeRevenueComponent } from './income-revenue/income-revenue.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SortItemsPipe } from '../pipes/sort-items.pipe';
import { incomeRevenueReducer } from './income.revenue.reducer';

@NgModule({
  declarations: [
    IncomeRevenueComponent,
    StatisticsComponent,
    DetailComponent,
    SortItemsPipe,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule,
    StoreModule.forFeature('incomeRevenue', incomeRevenueReducer),
  ],
  exports: [
    IncomeRevenueComponent,
    StatisticsComponent,
    DetailComponent,
    DashboardComponent,
    RouterModule,
  ],
})
export class IncomeRevenueModule {}

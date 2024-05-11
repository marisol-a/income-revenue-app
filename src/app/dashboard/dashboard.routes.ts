import { Routes } from '@angular/router';
import { StatisticsComponent } from '../income-revenue/statistics/statistics.component';
import { IncomeRevenueComponent } from '../income-revenue/income-revenue/income-revenue.component';
import { DetailComponent } from '../income-revenue/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-revenue', component: IncomeRevenueComponent },
  { path: 'detail', component: DetailComponent },
];

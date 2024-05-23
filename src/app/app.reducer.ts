import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeRevenue from './income-revenue/income.revenue.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  incomeRevenue: incomeRevenue.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  incomeRevenue: incomeRevenue.incomeRevenueReducer,
};

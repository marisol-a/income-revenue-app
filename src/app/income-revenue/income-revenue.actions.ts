import { createAction, props } from '@ngrx/store';
import { IncomeRevenue } from '../models/income-revenue.model';

export const setItems = createAction(
  '[INCOME REVENUE] Set items',
  props<{ items: IncomeRevenue[] }>()
);
export const unsetItems = createAction('[INCOME REVENUE] Unset items');

import { createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './income-revenue.actions';
import { IncomeRevenue } from '../models/income-revenue.model';

export interface State {
  items: IncomeRevenue[];
}

export const initialState: State = {
  items: null,
};

export const _incomeRevenueReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({
    ...state,
    items: [...items],
  })),
  on(unsetItems, (state) => ({ ...state, incomeRevenue: [] }))
);

export function incomeRevenueReducer(state, action) {
  return _incomeRevenueReducer(state, action);
}

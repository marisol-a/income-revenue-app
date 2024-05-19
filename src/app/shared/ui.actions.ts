import { createAction } from '@ngrx/store';

export const startLoading = createAction('[UI Component] Is loading');
export const stopLoading = createAction('[UI Component] Stop loading');

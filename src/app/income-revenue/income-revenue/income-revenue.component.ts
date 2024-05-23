import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeRevenue } from '../../models/income-revenue.model';
import { IncomeRevenueService } from '../../services/income-revenue.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-income-revenue',
  templateUrl: './income-revenue.component.html',
  styleUrl: './income-revenue.component.scss',
})
export class IncomeRevenueComponent implements OnInit, OnDestroy {
  incomeRevenueForm: FormGroup;
  type: string = 'Ingreso';
  loadingSubs: Subscription;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private incomeRevenueService: IncomeRevenueService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.incomeRevenueForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.loadingSubs = this.store
      .select('ui')
      .subscribe((ui) => (this.loading = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  save() {
    if (this.incomeRevenueForm.invalid) {
      return;
    }
    this.store.dispatch(ui.startLoading());
    const { description, amount } = this.incomeRevenueForm.value;
    const incomeRevenue = new IncomeRevenue(description, amount, this.type);
    this.incomeRevenueService
      .createIncomeRevenue(incomeRevenue)
      .then(() => {
        this.incomeRevenueForm.reset();
        Swal.fire('Registro creado', description, 'success');
        this.store.dispatch(ui.stopLoading());
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
        this.store.dispatch(ui.stopLoading());
      });
  }
}

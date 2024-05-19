import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  uiSubs: Subscription;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', Validators.required], //['', Validators.required, Validators.email]
      password: ['', Validators.required],
    });

    this.uiSubs = this.store
      .select('ui')
      .subscribe((ui) => (this.loading = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(ui.startLoading());
    // Swal.fire({
    //   title: 'Espera por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { user, email, password } = this.registerForm.value;
    this.authService
      .createUser(user, email, password)
      .then(() => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(ui.startLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', Validators.required], //['', Validators.required, Validators.email]
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espera por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { user, email, password } = this.registerForm.value;
    this.authService
      .createUser(user, email, password)
      .then(() => {
        Swal.close();
        this.router.navigate(['/']);
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

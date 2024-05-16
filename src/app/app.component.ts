import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  constructor(private authService: AuthService) {
    this.authService.initAuthListener();
  }
}

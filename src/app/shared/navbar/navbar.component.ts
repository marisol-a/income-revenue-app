import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  authInfoSubs: Subscription;
  userName: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authInfoSubs = this.store
      .select('auth')
      .pipe(filter(({ user }) => user !== null))
      .subscribe(({ user }) => (this.userName = user.name));
  }

  ngOnDestroy(): void {
    this.authInfoSubs.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import {
  collection,
  Firestore,
  Unsubscribe,
  setDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authAction from '../auth/auth.actions';
import * as incomeRevenueAction from '../income-revenue/income-revenue.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUnsubscribe: Unsubscribe;
  private _user: User;

  get user() {
    return this._user;
  }

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    return authState(this.auth).subscribe(async (fuser) => {
      if (fuser) {
        const userRef = collection(this.firestore, `${fuser.uid}`);
        const uidRef = doc(userRef, 'user');
        const querySnapshot = await getDoc(uidRef);

        this._user = { ...querySnapshot.data() } as User;
        this.store.dispatch(
          authAction.setUser({ user: { ...(querySnapshot.data() as User) } })
        );
      } else {
        this._user = null;
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authAction.unsetUser());
        this.store.dispatch(incomeRevenueAction.unsetItems());
      }
    });
  }

  createUser(user: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (fuser) => {
        const newUser = new User(fuser.user.uid, user, email);
        const userRef = collection(this.firestore, `${fuser.user.uid}`);
        const uidRef = doc(userRef);

        return setDoc(uidRef, { ...newUser });
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return authState(this.auth).pipe(map((fuser) => fuser !== null));
  }
}

import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  Firestore,
  Unsubscribe,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authAction from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUnsubscribe: Unsubscribe;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    return authState(this.auth).subscribe(async (fuser) => {
      if (fuser) {
        const userRef = collection(this.firestore, 'user');
        const userQuery = query(userRef, where('uid', '==', fuser.uid));
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
          this.store.dispatch(authAction.setUser({ user: doc.data() as User }));
        });
      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authAction.unsetUser());
      }
    });
  }

  createUser(user: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (fuser) => {
        const newUser = new User(fuser.user.uid, user, email);
        const userRef = collection(this.firestore, 'user');

        return addDoc(userRef, { ...newUser });
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

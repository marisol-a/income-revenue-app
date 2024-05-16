import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  initAuthListener() {
    return authState(this.auth).subscribe((fuser) =>
      console.log('user: ', fuser)
    );
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

import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionSnapshots,
  doc,
  Firestore,
  deleteDoc,
} from '@angular/fire/firestore';
import { IncomeRevenue } from '../models/income-revenue.model';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeRevenueService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  createIncomeRevenue(incomeRevenue: IncomeRevenue) {
    const uid = this.authService.user?.uid;

    delete incomeRevenue.uid;

    const incomeRevenueCollection = collection(
      this.firestore,
      `${uid}/income-revenue/items`
    );
    return addDoc(incomeRevenueCollection, {
      ...incomeRevenue,
      uid,
    });
  }

  initIncomeRevenue(uid: string) {
    return collectionSnapshots(
      collection(this.firestore, `${uid}/income-revenue/items`)
    ).pipe(
      map((collection) => {
        return collection.map((item) => {
          return { ...item.data(), uid: item.id } as IncomeRevenue;
        });
      })
    );
  }

  deteleIncomeExpense(uid: string) {
    const uidUser = this.authService.user?.uid;
    const itemReference = doc(
      this.firestore,
      `${uidUser}/income-revenue/items/${uid}`
    );
    return deleteDoc(itemReference);
  }
}

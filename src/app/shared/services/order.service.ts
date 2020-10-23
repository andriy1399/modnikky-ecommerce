import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { IMyInformation } from '../interfaces/my-information.interface';
import { IOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private afFirestore: AngularFirestore
  ) { }
  getUser(user: IMyInformation): AngularFirestoreCollection<unknown> {
    return this.afFirestore.collection('users', ref => ref.where('id', '==', user.id));
  }
  updateInformation(user: IMyInformation): Promise<void> {
    return this.afFirestore.collection('users')
    .doc(user.uId).set(user);
  }

  addOrder(order: IOrder): Promise<DocumentReference> {
    return this.afFirestore.collection('orders').add({ ...order as IOrder});
  }
}

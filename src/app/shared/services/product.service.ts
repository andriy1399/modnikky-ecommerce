import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private afFirestore: AngularFirestore
  ) { }

  updateProduct(product: IProduct): Promise<void> {
    return this.afFirestore.doc('products/' + product.id).update({ ...product });
  }

  getProducts(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afFirestore.collection('products').snapshotChanges();
  }
  addProduct(product: IProduct): Promise<DocumentReference> {
    return this.afFirestore.collection('products').add({ ...product });
  }
  deleteProduct(pId: string): Promise<void> {
    return this.afFirestore.doc('products/' + pId).delete();
  }
}

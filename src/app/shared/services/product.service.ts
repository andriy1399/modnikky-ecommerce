import { T } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { IProduct, ISale } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type = new Subject<string>();
  changedFilter = new Subject<string>();
  bag = new Subject<number>();
  bagModalShow = new Subject<boolean>();
  constructor(
    private afFirestore: AngularFirestore
  ) {
  }

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
  getProductById(id: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return this.afFirestore.collection('products').ref.doc(id);
  }
  getProductByCategory(type: string, category: string): AngularFirestoreCollection<unknown> {
    const typeName = this.getType(type);
    if (category !== 'view-all') {
      if (typeName === 'shop') {
        return this.afFirestore.collection('products', ref => {
          return ref.where('category', '==', category);
        });
      } else {
        return this.afFirestore.collection('products', ref => {
          return ref.where(typeName, '==', true).where('category', '==', category);
        });
      }
    } else {
      if (typeName === 'shop') {
        return this.afFirestore.collection('products');
      } else {
        return this.afFirestore.collection('products', ref => ref.where(typeName, '==', true));
      }
    }
  }
  getProductByType(type: string): Observable<DocumentChangeAction<unknown>[]> {
    const typeName = this.getType(type);
    return this.afFirestore.collection('products', ref => {
      return ref.where(typeName, '==', true);
    }).snapshotChanges();
  }

  getProductLimit(limit: number): Observable<DocumentChangeAction<unknown>[]> {
    return this.afFirestore.collection('products', ref => ref.limit(limit)).snapshotChanges();
  }

  private getType(type: string): string {
    switch (type) {
      case 'shop':
        return 'shop';
      case 'sale':
        return 'isSale';
      case 'new-arrivals':
        return 'isNewArrivals';
      default:
        break;
    }
  }
}


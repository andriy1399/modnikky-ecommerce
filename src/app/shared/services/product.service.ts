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
  getProductById(id: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return this.afFirestore.collection('products').ref.doc(id);
  }
  getProductByCategory(type: string, category: string): AngularFirestoreCollection<unknown> {
    const boolData = this.getType(type);
    console.log(boolData);
    if (category !== 'view-all') {
      if (boolData.name === 'shop') {
        return this.afFirestore.collection('products', ref => {
          return ref.where('isSale', '==', boolData.isSale)
            .where('isNewArrivals', '==', boolData.isNewArrivals).where('category', '==', category);
        });
      } else {
        return this.afFirestore.collection('products', ref => {
          return ref.where(boolData.name, '==', true).where('category', '==', category);
        });
      }

    } else {
      if (boolData.name === 'shop') {
        return this.afFirestore.collection('products', ref => {
          return ref.where('isSale', '==', boolData.isSale)
            .where('isNewArrivals', '==', boolData.isNewArrivals);
        });
      } else {
        return this.afFirestore.collection('products', ref => ref.where(boolData.name, '==', true));
      }
    }
  }

  private getType(type: string): { isSale: boolean, isNewArrivals: boolean, name: string } {
    switch (type) {
      case 'shop':
        return { isSale: false, isNewArrivals: false, name: 'shop' };
      case 'sale':
        return { isSale: true, isNewArrivals: true, name: 'isSale' };
      case 'new-arrivals':
        return { isSale: true, isNewArrivals: true, name: 'isNewArrivals' };
      default:
        break;
    }
  }
}


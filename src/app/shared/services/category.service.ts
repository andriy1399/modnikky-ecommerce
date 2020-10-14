import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private afFirestore: AngularFirestore
  ) { }

  updateCategory(category: ICategory): Promise<void> {
    return this.afFirestore.doc('category/' + category.id).update({ ...category });
  }

  getCategory(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afFirestore.collection('category').snapshotChanges();
  }

  getCorrectCategory(type: string): Observable<unknown[]> {
    return this.afFirestore.collection('category', ref => ref.where(type, '==', true)).valueChanges();
  }
  addCategory(category: ICategory): Promise<DocumentReference> {
    return this.afFirestore.collection('category').add({ ...category });
  }
  deleteCategory(cId: string): Promise<void> {
    return this.afFirestore.doc('category/' + cId).delete();
  }
}

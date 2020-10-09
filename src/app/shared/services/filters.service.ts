import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IFilter } from '../interfaces/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(
    private afFirestore: AngularFirestore
  ) { }

  updateFilter(filter: IFilter): Promise<void> {
    return this.afFirestore.doc('filters/' + filter.id).update(filter);
  }

  getFilters(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afFirestore.collection('filters').snapshotChanges();
  }
  addFilter(filter: IFilter): Promise<DocumentReference> {
    return this.afFirestore.collection('filters').add({ ...filter as IFilter});
  }
  deleteFilter(fId: string): Promise<void> {
    return this.afFirestore.doc('filters/' + fId).delete();
  }
}

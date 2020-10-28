import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private afFirestore: AngularFirestore
  ) { }

  updateNews(post: IPost): Promise<void> {
    return this.afFirestore.doc('news/' + post.id).update({ ...post });
  }

  getNews(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afFirestore.collection('news').snapshotChanges();
  }

  addNews(post: IPost): Promise<DocumentReference> {
    return this.afFirestore.collection('news').add({ ...post });
  }
  deleteNews(pId: string): Promise<void> {
    return this.afFirestore.doc('news/' + pId).delete();
  }
  getPostById(id: string): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return this.afFirestore.collection('news').ref.doc(id);
  }
}

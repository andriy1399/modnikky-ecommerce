import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/interfaces/post.interface';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  news: IPost[] = [];
  newsHTML = '';
  editorStyles = {
    height: '500px',
    backgroundColor: '#ffffff'
  };
  tabsIndex = 0;
  titlePost = '';
  descriptionPost = '';
  uploadProgress: Observable<number>;
  imgStatus = false;
  previewImages: string;
  isEditing = false;
  constructor(
    private fireStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
  }
  public setTabs(event): void {
    this.tabsIndex = event;
  }

  uploadFile(event): void {
    this.imgStatus = false;
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    const task = this.fireStorage.upload(`images/${name}`, file);
    this.uploadProgress = task.percentageChanges();
    task.then(img => {
      this.fireStorage.ref(`images/${img.metadata.name}`).getDownloadURL()
        .subscribe(url => {
          this.previewImages = url;
          this.imgStatus = true;
        });
    });
  }

  public clearPreviewImage(): void {
    this.fireStorage.storage.refFromURL(this.previewImages).delete();
    this.previewImages = '';
  }

  addPost(): void {
    const post: IPost = new Post(this.newsHTML, this.titlePost, this.descriptionPost, this.previewImages, new Date());

  }
}

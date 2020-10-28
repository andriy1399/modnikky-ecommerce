import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/interfaces/post.interface';
import { Post } from '../../shared/models/post.model';
import { NewsService } from '../../shared/services/news.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  news: MatTableDataSource<IPost>;
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
  displayedColumns: string[] = ['poster', 'title', 'date', 'edit', 'delete'];
  editingPostId: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private fireStorage: AngularFireStorage,
    private newsServ: NewsService
  ) { }

  ngOnInit(): void {
    this.getNews();
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
    this.newsServ.addNews(post)
      .then(() => {
        this.clearForm();
        this.getNews();
        window.scrollTo(0, 0);
      });
  }

  private getNews(): void {
    this.newsServ.getNews()
      .subscribe(data => {
        this.news = new MatTableDataSource(data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IPost;
          return { id, ...otherData };
        }));
        this.news.paginator = this.paginator;
      });
  }

  editPost(post: IPost): void {
    this.newsHTML = post.htmlContent;
    this.descriptionPost = post.description;
    this.previewImages = post.poster;
    this.titlePost = post.title;
    this.isEditing = true;
    this.editingPostId = post.id;
    console.log(this.newsHTML);
    this.tabsIndex = 0;
  }

  updatePost(): void {
    const post: IPost = new Post(this.newsHTML, this.titlePost, this.descriptionPost, this.previewImages, new Date());

    this.newsServ.updateNews({ ...post, id: this.editingPostId })
      .then(() => {
        this.getNews();
        this.isEditing = false;
        this.clearForm();
      });
  }

  deletePost(id: string): void {
    this.newsServ.deleteNews(id)
      .then(() => {
        this.getNews();
      });
  }

  private clearForm(): void {
    this.newsHTML = this.titlePost = this.descriptionPost = this.previewImages = '';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.news.filter = filterValue.trim().toLowerCase();

    if (this.news.paginator) {
      this.news.paginator.firstPage();
    }
  }
}

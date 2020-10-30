import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { NewsService } from '../../shared/services/news.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: IPost[] = [];
  defaultImage = 'https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif';
  p = 1;
  constructor(
    private newsServ: NewsService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('News | Modnikky');
    this.getNews();
  }

  private getNews(): void {
    this.newsServ.getNews()
      .subscribe(data => {
        this.news = data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IPost;
          return { id, ...otherData };
        });
      });
  }
  public pageChanged(event: number): void {
    this.p = event;
    window.scrollTo(0, 0);
  }
}

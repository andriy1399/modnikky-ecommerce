import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { NewsService } from '../../shared/services/news.service';
import { Title, Meta } from '@angular/platform-browser';
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
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('News | Modnikky');
    this.getNews();
    this.meta.addTags([
      { name: 'keywords', content: `news, press, modnikky news, new trends, shop, modnikky` },
      { name: 'description', content: `Browse our range of clothes for women. You will always find the latest trends and styles at Modnikky. Shop online or in-store.`}
    ]);
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

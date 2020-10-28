import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../shared/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  post: IPost;
  shortTitle: string;
  constructor(
    private newsServ: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPost();
  }
  private getPost(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.newsServ.getPostById(postId).get()
      .then(doc => {
        if (doc.exists) {
          const id = doc.id;
          const data = doc.data() as IPost;
          this.post = { ...data, id };
          this.shortTitle = data.title.split(' ').slice(0, 3).join(' ');
        }
      }).catch(err => console.log(err));
  }
}

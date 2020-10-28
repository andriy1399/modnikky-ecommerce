import { IPost } from '../interfaces/post.interface';
export class Post implements IPost {
  constructor(
    public htmlContent: string,
    public title: string,
    public description: string,
    public poster: string,
    public date: Date,
  ) { }
}

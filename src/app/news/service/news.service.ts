import { Injectable } from '@angular/core';
import { AbstractRestService } from '../../service/BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NewsPostMod } from '../model/news.model';
import { Subject } from 'rxjs';


@Injectable()
export class NewsService extends AbstractRestService {
  private controller: string = "NewsPosts/";
  newsListChange: Subject<NewsPostMod[]> = new Subject<NewsPostMod[]>();
 

  
  constructor(http: HttpClient) {
    super(http)

  }
  saveNewsPost(newsPost: NewsPostMod) {
    return this.postItem<NewsPostMod>(this.controller + "SaveNewsPost", newsPost);
  }

  deleteNewsPost(userId: string, postId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("postId", postId);
    return this.deleteItem<boolean>(this.controller + "DeleteNewsPost", httpParams);
  }

  getNewsPosts(userId: string, propertyId: string) {
    let httpParams: HttpParams = new HttpParams().append("userId", userId).append("propertyId", propertyId);
    return this.getItem<NewsPostMod[]>(this.controller + "GetNewsPosts", httpParams)
  }

  loadNewsPosts(userId: string, propertyId: string) {
    this.getNewsPosts(userId, propertyId).subscribe(data => {
      this.newsListChange.next(data);

    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsPostMod } from '../model/news.model';
import { NewsService } from '../service/news.service';
import { UserSession } from '../../model/usersession.model';
import { AppsessionService } from '../../service/appsession.service';

@Component({
  selector: 'app-newspostlist',
  templateUrl: './newspostlist.component.html'
})
export class NewspostlistComponent implements OnInit, OnDestroy {
  availableNews: NewsPostMod[];
  currentNews: NewsPostMod[] = new Array<NewsPostMod>();

  currentUser: UserSession;
  private subscription: any;
  constructor(private appsession: AppsessionService, private newsSource: NewsService) {
  }

  trackingBy(index: number, data: NewsPostMod): string { return data.id; }

  ngOnInit() {
    this.subscription =  this.newsSource.newsListChange.subscribe(value => {
      this.availableNews = value;
      if (this.availableNews != null) {

          this.currentNews = this.appsession.paginate(this.availableNews, this.appsession.defaultPageSize, this.appsession.defaultPageSize);        
      }

    });
    if (this.appsession.IsUserLoggedIn) {

      this.currentUser = this.appsession.CurrentUser;

      if (this.appsession.selectedProperty != null) {

        this.newsSource.loadNewsPosts(this.appsession.CurrentUser.userVM.id, this.appsession.selectedProperty.id);

      }

    }
  }

  onLikeClick(index: number) {
    let post = this.currentNews[index];
    post.likes++;
    this.currentNews[index] = post;
  }

  ondeletePost(index: number) {

    this.newsSource.deleteNewsPost(this.appsession.CurrentUser.userVM.id, this.currentNews[index].id).subscribe(data => {

      if (data) {
        this.currentNews.splice(index, 1);
      }

    });
  
  }

  GetImageUrl(userPhoto: string) {
    let result = this.appsession.getImageData(userPhoto, 'image', '../../../assets/img/avatar1.jpg');
    return result;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

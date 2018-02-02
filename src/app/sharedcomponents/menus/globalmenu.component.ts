import { Component, OnInit, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppsessionService } from '../../service/appsession.service'
import { GlobalService } from '../../service/model.service';
import { Language } from '../../model/global.model';

@Component({
  selector: 'app-globalmenu',
  templateUrl: './globalmenu.component.html'
})
export class GlobalmenuComponent implements OnInit,OnDestroy {
  currentDiplayLang: string;
  isLoggedIn: boolean = false;
  currentValueLang: string;
  availableLangs: Language[];
  alreadySetLanguage: boolean =false;
  switchedValueLang: string;
  private subsriptionIsUserLoggedIn: any;
    constructor(private translate: TranslateService,  private appsession: AppsessionService, private globalSource: GlobalService) {
        
    }

    switchLanguage(language: Language) {
      this.currentDiplayLang = language.displayName;
      this.appsession.setTranslateLang(language.lang);
      this.switchedValueLang = language.lang;

      this.loadData();


    }


    logOutUser() {
        this.appsession.logOut();
    }


    ngOnInit() {
      this.subsriptionIsUserLoggedIn =  this.appsession.IsUserLoggedInChange.subscribe(value => {
        this.isLoggedIn = value;
     })

      this.loadData();
    }

    loadData() {

      if (this.availableLangs != null && this.availableLangs.length > 0) {
        this.setLanguages();
        return;
      }
      this.globalSource.getLanguages().subscribe(data => {
        this.availableLangs = data;
        this.globalSource.setAvailableLanguages(data);
        this.setLanguages();

      });
    }

    setLanguages() {
      let langs = [];

      if (this.switchedValueLang != null) {
        langs = this.availableLangs.filter(x => x.lang == this.switchedValueLang);
      }
      else {
        langs = this.availableLangs.filter(x => x.lang == this.appsession.currentLanguage);
      }

      if (langs.length > 0) {
        this.currentValueLang = langs[0].lang;
        this.currentDiplayLang = langs[0].displayName;
        this.alreadySetLanguage = true;
      }
    }

    ngOnDestroy(){
      this.subsriptionIsUserLoggedIn.unsubscribe();
    }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../model/users.model';
import { UserSession } from '../model/usersession.model';
import { PropertyInformation } from '../property/model/property.model';
import { AppConstants } from '../common/AppConstants';
import { MessageDetail } from '../model/utility.model';
import { PropertyService } from '../property/service/property.service';
import { NotificationService } from '../notification/service/notification.service';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AppsessionService {
    properties: PropertyInformation[];
    editItem: any = null;
    IsUserLoggedIn: boolean = false;
    LeftMenuOpen: boolean = false;
    AppTitle: string = "";
    JustRegistered: boolean = false;
    TempUser: User = null;
    CurrentUser: UserSession = null;
    defaultPageSize: number = 10;
    defaultPageNumber:number = 1;
    IsUserLoggedInChange: Subject<boolean> = new Subject<boolean>();
    LeftMenuOpenChange: Subject<boolean> = new Subject<boolean>();
    AppTitleChange: Subject<string> = new Subject<string>();
    UserSessionChange: Subject<UserSession> = new Subject<UserSession>();
    currentUnviewdNotificationCountChange: Subject<number> = new Subject<number>();
    IsHasManageRights: boolean = false;
    selectedProperty: PropertyInformation;
    currentLanguage: string = "en";


    HeaderInfoMsgChange: Subject<MessageDetail> = new Subject<MessageDetail>();
    selectedPropertyChange: Subject<PropertyInformation> = new Subject<PropertyInformation>();



    constructor(private translate: TranslateService, private route: Router, private propService: PropertyService, private notifyService: NotificationService) {
     
        this.IsUserLoggedInChange.subscribe(value => {
            this.IsUserLoggedIn = value;
        })
        this.UserSessionChange.subscribe((value) => {
            this.CurrentUser = value
        });
    }

    setTranslateLang(lang: string) {
      this.currentLanguage = lang;
      this.translate.use(lang);
    }

    addToSession(key:string , value:any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    getFromSession<Tresult>(key: string): Tresult {
        let value: Tresult;
        value = JSON.parse(sessionStorage.getItem(key));
        return value;
    }




    removeFromSession(key: string) {
        sessionStorage.removeItem(key);
    }

    clearSession() {
        sessionStorage.clear();
    }

    addToLocal(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    getFromLocal<Tresult>(key: string): Tresult {
        let value: Tresult;
        value = JSON.parse(localStorage.getItem(key));
        return value;
    }

    removeFromLocal(key: string) {
        localStorage.removeItem(key);
    }

    clearLocal() {
        localStorage.clear();
    }

    getCurrentUser(): UserSession{
      let sessionKey = this.getUserSessionId();
      if (sessionKey != null) {

        let cUser = this.getFromSession<UserSession>(sessionKey);
        return cUser;
      }

      return null;
       
    };

    logOut(redirectHandled: boolean = false)
    {
        this.selectedProperty = null;
        this.IsHasManageRights = false;
        this.propService.isPropInforAlreadyLoaded = false;
        this.propService.propInfoList = null;
        this.properties = null;
        this.clearSession();
        this.clearLocal();
        this.IsUserLoggedIn = false;
        this.UserSessionChange.next(null);
        this.IsUserLoggedInChange.next(this.IsUserLoggedIn);
        this.notifyService.notificationMaster = null;
        if (!redirectHandled) {
          this.route.navigate(['']);
        }

     
    }

    redirectToRoute(routeName?: string, queryParameter?: any) {
      if (routeName == null) {
        routeName = '';
      }

      if (queryParameter == null) {
        this.route.navigate([routeName]);
      }
      else {
        this.route.navigate([routeName], queryParameter);
      }
    
    }


    logIn(value: UserSession, rememberMe: boolean) {

      if (value != null) {

        this.IsHasManageRights = value.isManager;
        
        if (rememberMe) {
          this.addToLocal(AppConstants.SessionKeyRemember, value.userVM.email);
        }
        else {
          this.clearLocal();
        }

        this.addToSession(AppConstants.SessionKeyUser, value.userVM.loginSessionId);
    
        this.addToSession(value.userVM.loginSessionId, value);

        if (value.userVM.lang != null) {
          this.setTranslateLang(value.userVM.lang);
        }

        this.IsUserLoggedIn = true;
        this.UserSessionChange.next(value);
        this.IsUserLoggedInChange.next(this.IsUserLoggedIn);
      }

    }

    setGlobalHeaderMessage(msgData?: MessageDetail) {

      if (msgData == null) {
        msgData = new MessageDetail();
        msgData.msg = this.getTranslated(AppConstants.Successful);
      }

      this.HeaderInfoMsgChange.next(msgData);
    }


    OpenLeftMenu(isOpen: boolean) {
        this.LeftMenuOpen = isOpen;
        this.LeftMenuOpenChange.next(this.LeftMenuOpen);
    }

    setIsLogIn(value: boolean, userSession : UserSession)
    {
        this.UserSessionChange.next(userSession);
        this.IsUserLoggedInChange.next(value);
    }

    updateCurrentUserSession(userSession: UserSession) {

      let sessionKey = this.getUserSessionId();

      if (sessionKey != null) {
        this.addToSession(sessionKey, userSession);
        this.UserSessionChange.next(userSession);
      }

     
    }


    setSelectedProperty(currentProp: PropertyInformation) {

      this.selectedProperty = currentProp;
      this.selectedPropertyChange.next(currentProp);
     
    }

    getUserSessionId() : string{
      let sessionKey = this.getFromSession<string>(AppConstants.SessionKeyUser);

      if (sessionKey != null) {

        return sessionKey;
      }

      return null;
      
    }

    getUserRememberMe() {
      return this.getFromLocal<string>(AppConstants.SessionKeyRemember);
    }



    getTranslated(resourceKey: string): string
    {
        return this.translate.instant(resourceKey);
    }

    paginate(array: any, page_size: number, page_number: number) {

      return array.slice(0, page_number * page_size);
    }
  

    SetAppTitle(titleKey: string) {
        this.AppTitle = titleKey;
        this.AppTitleChange.next(this.AppTitle);
    }

    getHttpErrorMessages(err: any): string[] {
        let messages: string[] = new Array<string>();

        if (typeof err === "object") {

            for (var item in err) {
                messages.push(this.translate.instant(item))
            }

        }
        else if (typeof err === "string") {

            messages.push(this.translate.instant(AppConstants.ConnectionLostError))
        }

        return messages;
    }

    setTranslateDefault()
    {
      this.translate.setDefaultLang(this.currentLanguage);
    }

    getImageData(fileName: string, fileType: string, defaultUrl: string) {
      if (fileName != null && fileName != '') {

        if (fileType == "image") {
          return environment.azurePhotosUrl + fileName;
        }
       
      }

      return defaultUrl;
    }

   

}

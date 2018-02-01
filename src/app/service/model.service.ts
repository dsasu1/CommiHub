import { Injectable, OnInit } from '@angular/core';
import { UserType, User } from '../model/users.model';
import { Language, Country, ZipCode } from '../model/global.model';

import { UserSession } from '../model/usersession.model';
import { AbstractRestService } from './BaseService';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SecurityQuestions } from '../model/global.model';
import { RecaptchaRequest, RecaptchaResponse } from '../sharedcomponents/recaptcha/model/recaptcha.model';
import { Subject } from 'rxjs';



@Injectable()
export class UsersService extends AbstractRestService{
    private isSuccesful: boolean = false;
    private controller: string = "users/";

  constructor(http: HttpClient) {
    super(http);

  }

  getUserTypes() {
    return this.getItem<UserType[]>(this.controller + "getusertypes");
  }

  registerUser(user: User) {
      return this.postItem<boolean>(this.controller + "RegisterUser", user);
  }

  verifyUserSession(user: User) {
    return this.postItem<boolean>(this.controller + "VerifyUserSession", user);
  }

  userHasManagementRights(user: User) {
    return this.postItem<boolean>(this.controller + "HasManagementRights", user);
  }

  loginUser(user: User) {
      return this.postItem<UserSession>(this.controller + "LoginUser", user);
  }

  verifyRecaptcha(req: RecaptchaRequest) {
    return this.postItem<RecaptchaResponse>(this.controller + "VerifyRecaptcha", req);
  }


  SaveUserInfo(user: User) {
      return this.putItem<boolean>(this.controller + "ModifyUser", user);
  }

  confirmUser(user: User) {
      return this.putItem<boolean>(this.controller + "ConfirmUser", user);
  }

  deactivateAccount(userVm: User) {
    return this.postItem<boolean>(this.controller + "DeactivateAccount", userVm);
  }

  retrieveAccount(user: User) {
      return this.postItem<User>(this.controller + "RetrieveAccount", user);
  }

  verifySecurityAnswer(user: User) {
      return this.postItem<boolean>(this.controller + "VerifySecurityAnswer", user);
  }

  verifyChangePassword(user: User) {
      return this.postItem<User>(this.controller + "VerifyChangePassword", user);
  }

  saveNewPassword(user: User) {
      return this.postItem<boolean>(this.controller + "SaveNewPassword", user);
  }

}


@Injectable()
export class GlobalService extends AbstractRestService {

  private languages: Language[] = new Array<Language>();
  languageChanges: Subject<Language[]> = new Subject<Language[]>();

    private controller: string = "global/";
    constructor(http: HttpClient) {
        super(http);
    }

    getSecQuestions(){
      return this.getItem<SecurityQuestions[]>(this.controller + "GetSecurityQuestions");

    }



    lookUpZip(code: string) {
      let httpParam: HttpParams = new HttpParams().append("code", code);
      return this.getItem<ZipCode>(this.controller + "GetZipLookup", httpParam);

    }

    loadLanguages() {
      if (this.languages != null && this.languages.length > 0) {
         this.languageChanges.next(this.languages);
      }
      else {
        this.getItem<Language[]>(this.controller + "GetLanguages").subscribe(data => {
          this.languages = data;
          this.languageChanges.next(data)

        });
      }
     
    }

    getLanguages(){
      return this.getItem<Language[]>(this.controller + "GetLanguages");

    }

    getavailableLanguages() {
      return this.languages;
    }

    setAvailableLanguages(langs: Language[]) {
      this.languages = langs;
    }

    getCountries(){
      return this.getItem<Country[]>(this.controller + "GetCountries");
    }
}


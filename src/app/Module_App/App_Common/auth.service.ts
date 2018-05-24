import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Client } from './app.enum';
import RouteName from './routeName';
import { HttpService } from 'src/app/Module_Core';
import { IAuthenticatedUser, Role } from './app.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AppAuthService {
  private _token: string;
  private NAME_KEY = '__name_Key__';
  private USER_INFO_KEY = '__userInfo__';
  private _client = '__client__';

  isServerAvailable = false;

  constructor(
    private dataService: HttpService,
    // private router: Router,
    private apiService: ApiService
  ) {
    sessionStorage.removeItem(this.USER_INFO_KEY);
    this.getUserInfo().subscribe();
    this.getClient();
  }

  // properties

  get userInfo(): IAuthenticatedUser {
    let user = null;
    user = JSON.parse(sessionStorage.getItem(this.USER_INFO_KEY));
    return user;
  }

  set userInfo(info: IAuthenticatedUser) {
    sessionStorage.setItem(this.USER_INFO_KEY, JSON.stringify(info));
  }

  get isTeacher(): boolean {
    return this.userInfo.isTeacher;
  }

  get isStudent(): boolean {
    return this.userInfo.isStudent;
  }

  get isParent(): boolean {
    return this.userInfo.isParent;
  }

  get isSysAdmin(): boolean {
    return this.userInfo.isSysAdmin;
  }

  get isSchoolAdmin(): boolean {
    return this.userInfo.isSchoolAdmin;
  }

  get isPricipal(): boolean {
    return this.userInfo.isPricipal;
  }

  get client(): string {
    return sessionStorage.getItem(this._client);
  }

  set client(clientName: string) {
    sessionStorage.setItem(this._client, clientName);
  }

  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this._token);
  }

  set token(token: string) {
    const key = this.dataService.TOKEN_KEY;
    sessionStorage.setItem(key, token);
  }

  get token(): string {
    return this.userInfo.token;
  }

  // functions

  getClient() {
    this.dataService
      .getString(this.apiService.urlGetClient())
      .subscribe(client => (this.client = client.toUpperCase()));
  }

  getUserInfoPromise(): Promise<IAuthenticatedUser> {
    const promise = this.getUserInfo().toPromise();
    return promise;
  }

  getUserInfo(): Observable<IAuthenticatedUser> {
    this.userInfo = null;
    this.token = null;
    return this.dataService.getData(this.apiService.urlGetUser()).pipe(
      map((user: IAuthenticatedUser) => {
        this.mapUserRole(user);
        return this.userInfo;
      })
    );
  }
  getServerDateTime() {
    return this.dataService.getData(this.apiService.urlGetServerDateTime());
  }

  private mapUserRole(user: IAuthenticatedUser) {
    if (user && user.userId) {
      const _user: IAuthenticatedUser = user;
      this.userInfo = user;
      _user.isSysAdmin = false;
      _user.isSchoolAdmin = false;
      _user.isPricipal = false;
      _user.isTeacher = false;
      _user.isParent = false;
      _user.isStudent = false;
      switch (user.role) {
        case Role.SystemAdmin:
          _user.isSysAdmin = true;
          break;
        case Role.SchoolAdmin:
          _user.isSchoolAdmin = true;
          break;
        case Role.Principal:
          _user.isPricipal = true;
          break;
        case Role.Teacher:
          _user.isTeacher = true;
          break;
        case Role.Parent:
          _user.isParent = true;
          break;
        case Role.Student:
          _user.isStudent = true;
          break;
      }
      this.userInfo = _user;
      this.token = _user.token;
    } else {
      this.userInfo = null;
    }
  }
}

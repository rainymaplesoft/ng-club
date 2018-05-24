import { Injectable } from '@angular/core';
import { Config } from 'src/app/app.config';

@Injectable()
export class ApiService {
  constructor() {}

  private getApiUrl(endPoint: string, params: any[]) {
    const paramString =
      params === null || params === undefined || params.length === 0
        ? ''
        : '/' + params.join('/');
    return Config.ApiUrl + endPoint + paramString;
  }

  // common
  urlGetConfig = (...p: any[]) => this.getApiUrl('api/auth/GetConfig', p);
  urlGetServerDateTime = (...p: any[]) =>
    this.getApiUrl('api/auth/GetServerDateTime', p);
  urlGetUser = (...p: any[]) => this.getApiUrl('api/auth/getuser', p);
  urlGetClient = (...p: any[]) => this.getApiUrl('api/auth/GetClient', p);

  // Jwt Authentication
  urlJwtRegister = (...p: any[]) => this.getApiUrl('api/JwtAuth/Register', p);
  urlLogin = (...p: any[]) => this.getApiUrl('api/JwtAuth/Login', p);
}

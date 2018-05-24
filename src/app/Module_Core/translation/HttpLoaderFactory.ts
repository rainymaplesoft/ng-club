import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/app.config';

export function HttpLoaderFactory(http: HttpClient) {
  const origin = window.location.origin;
  let baseUrl = Config.getBaseUri();
  let assetPath = '';

  if (origin.indexOf(':4200') > 0) {
    baseUrl = 'http://localhost:4200/';
    assetPath = '';
  }

  const localePath = baseUrl + assetPath + 'i18n/';
  // console.log('app.module=> localePath: ' + localePath);
  return new TranslateHttpLoader(http, localePath);
}

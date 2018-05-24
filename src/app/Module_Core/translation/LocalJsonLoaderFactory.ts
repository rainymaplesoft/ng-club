import { TranslateLoader } from '@ngx-translate/core';
import { KeysToUpperCase } from './util';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap, finalize } from 'rxjs/operators';
import { Config } from 'src/app/app.config';

export class LocalJsonTransLoader implements TranslateLoader {
  private _jsonRoot = 'i18n';
  private _client: string;
  private _languageFile = 'language.json';
  private _languagePath: string;

  constructor(private httpClient: HttpClient) {
    this._client = Config.client;
    this.setup();
  }

  setup() {
    const origin = window.location.origin;
    let baseUrl = Config.getBaseUri();
    const assetPath = 'assets/';

    if (origin.indexOf(':4200') > 0) {
      baseUrl = 'http://localhost:4200/';
      // assetPath = '';
    }
    this._languagePath = baseUrl + assetPath + 'i18n/' + this._languageFile;
  }

  public getTranslation(lang: string): any {
    // parameter "lang" is the browser language setting, which is injected by TranslateLoader
    const language = Config.getLanguage(lang);
    const languageObject$ = this.httpClient.get(this._languagePath).pipe(
      map(jsonData => {
        // const jsonData = response.json();
        const terms = jsonData[this._jsonRoot][this._client][language];
        return terms;
      }),
      map(c => KeysToUpperCase(c))
    );
    return languageObject$;
  }
}
export function LocalJsonTransLoaderFactory(httpClient: HttpClient) {
  return new LocalJsonTransLoader(httpClient);
}

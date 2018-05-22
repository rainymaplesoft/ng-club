import { Injectable } from '@angular/core';
import {
  RequestOptions,
  ResponseContentType,
  RequestOptionsArgs
} from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/concatMap';
import { StorageService } from 'app/Module_Core/services/storage.service';
import { saveAs as importedSaveAs } from 'file-saver';
// import { Subject } from 'rxjs/Subject';
import { UtilService } from './util.service';

//#region meta data
enum HttpRequestType {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete'
}

interface OptionArgs {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  // responseType?: 'json' |'arraybuffer' | 'text' | 'blob';
  withCredentials?: boolean;
}

interface JsonOptionArgs extends OptionArgs {
  responseType: 'json';
}

interface TextOptionArgs extends OptionArgs {
  responseType: 'text';
}

interface BlobOptionArgs extends OptionArgs {
  responseType: 'blob';
}
//#endregion

@Injectable()
export class HttpService {
  private _authKey: string;
  private _token: string;
  private _isJwtAuth: boolean;
  private _httpErrorKey = '__http_request_error_key__';
  private _headers: Headers;

  public TOKEN_KEY = '__jwt_token_Key__';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private util: UtilService
  ) {}

  set AuthKey(authKey: string) {
    this._authKey = authKey;
  }

  set Token(token: string) {
    this._token = token;
  }

  //#region public functions

  putData<T>(url: string, jsonModel: any): Observable<Response> {
    return this.httpClient
      .put(url, jsonModel, this.jsonRequestOptions(HttpRequestType.Put))
      .catch((error, caugth) => this.handleErrors(error, caugth, url))
      .finally(this.handleFinally);
  }

  postData<T>(url: string, jsonModel: any): Observable<T> {
    return this.httpClient
      .post(url, jsonModel, this.jsonRequestOptions(HttpRequestType.Post))
      .catch((error, caugth) => this.handleErrors(error, caugth, url))
      .finally(this.handleFinally);
  }

  getData<T>(url: string): Observable<T> {
    return this.httpClient
      .get(url, this.jsonRequestOptions(HttpRequestType.Get))
      .catch((error, caugth) => this.handleErrors(error, caugth, url))
      .finally(this.handleFinally);
  }

  getString(url: string): Observable<string> {
    const options = this.textRequestOptions(HttpRequestType.Get);
    options.responseType = 'text';
    return this.httpClient
      .get(url, options)
      .catch((error, caugth) => this.handleErrors(error, caugth, url))
      .finally(this.handleFinally);
  }

  uploadFile(url: string, file: File, callBack: Function) {
    const headers = this.createHeaders(HttpRequestType.Post);
    const req = new HttpRequest('POST', url, file, {
      headers: headers,
      reportProgress: true
    });
    this.httpClient.request(req).subscribe(event => {
      if (event['type'] === HttpEventType.UploadProgress) {
        const percent = Math.round(100 * event['loaded'] / event['total']);
        callBack(percent);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded');
      }
    });
  }

  downloadFile(url: string, filename = null) {
    const request = this.httpClient
      .get(url, this.blobRequestOptions(HttpRequestType.Get))
      .catch((error, caugth) => this.handleErrors(error, caugth, url))
      .finally(this.handleFinally);
    request.subscribe(blob => importedSaveAs(blob, filename));
  }

  getAll(urls: string[]) {
    return Observable.forkJoin(this.getForJoinArray(urls));
  }

  //#endregion

  //#region private functions
  private getForJoinArray(urls: string[]) {
    const obServableRequests: Observable<any>[] = [];

    for (const url of urls) {
      const req = this.httpClient
        .get(url, this.jsonRequestOptions(HttpRequestType.Get))
        .catch((error, caugth) => this.handleErrors(error, caugth, url));
      obServableRequests.push(req);
    }
    return obServableRequests;
  }

  private handleErrors(error: Response, caught: any, url: string) {
    console.error('=== Failed to request HTTP service with URL below === ');
    console.warn(url);
    const errorMessage = JSON.stringify(error);
    console.log(error);
    return Observable.throw(error);
  }

  private handleFinally = () => {
    // any final processes
  };

  private jsonRequestOptions(httpRequestType: HttpRequestType): JsonOptionArgs {
    const headers = this.createHeaders(httpRequestType);

    const options: JsonOptionArgs = {
      headers: headers,
      responseType: 'json',
      withCredentials: true
    };

    return options;
  }

  private textRequestOptions(httpRequestType: HttpRequestType): TextOptionArgs {
    const headers = this.createHeaders(httpRequestType);

    const options: TextOptionArgs = {
      headers: headers,
      responseType: 'text',
      withCredentials: true
    };

    return options;
  }
  private blobRequestOptions(httpRequestType: HttpRequestType): BlobOptionArgs {
    const headers = this.createHeaders(httpRequestType);

    const options: BlobOptionArgs = {
      headers: headers,
      responseType: 'blob',
      withCredentials: true
    };

    return options;
  }

  private createHeaders(httpRequestType: HttpRequestType): HttpHeaders {
    let headers = new HttpHeaders({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'text/plain'
    });
    if (
      httpRequestType === HttpRequestType.Post ||
      httpRequestType === HttpRequestType.Put
    ) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    // console.log(this.util.GetIEVersion());
    // disable IE caching
    if (this.util.GetIEVersion() > 0) {
      headers.set('Cache-control', 'no-cache');
      headers.set('Pragma', 'no-cache');
      headers.set('Expires', 'Sat,01 Jan 2000 00:00:00 GMT');
      headers.set('If-Modified-Since', '0');
    }

    if (this.token) {
      headers.set('Authorization', 'Bearer ' + this.token);
    }
    return headers;
  }

  private get token() {
    return this.storageService.getItem(this.TOKEN_KEY);
  }
  //#endregion
}

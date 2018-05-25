/*
https://alligator.io/angular/cloud-firestore-angularfire/
*/

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { IKeyValue } from '../enums';
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

export interface INoSqlService {
  getDbObject(...params: string[]);
  updateDbObject(obj: IKeyValue[], ...params: string[]);
}

@Injectable()
export class AngularFireStoreService {
  constructor(private db: AngularFirestore) {}

  public getDocument<T>(path: string): Observable<T> {
    return this.db.doc<T>(path).valueChanges();
    // .pipe(first(), catchError(error => this.handleErrors(error, path)));
  }

  public getCollection<T>(path: string): Observable<T[]> {
    return this.db
      .collection<T>(path)
      .valueChanges()
      .pipe(catchError(error => this.handleErrors(error, path)));
  }

  private handleErrors(error: Response, url: string) {
    console.error('=== Failed to request HTTP service with URL below === ');
    console.warn(url);
    const errorMessage = JSON.stringify(error);
    console.log(error);
    return Observable.throw(error);
  }
}

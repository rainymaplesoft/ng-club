
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { IKeyValue } from '../enums';

export interface INoSqlService {
    getDbObject(...params: string[]);
    updateDbObject(obj: IKeyValue[], ...params: string[]);
}

@Injectable()
export class AngularFireService implements INoSqlService {

    constructor(private db: AngularFireDatabase) { }

    public getDbObjectOnce(...params: string[]) {
        const path = this.getPath(params);
        return this.db.object(path).valueChanges().first()
            .catch((error) => this.handleErrors(error, path));
    }

    public getDbObject(...params: string[]) {
        const path = this.getPath(params);
        return this.db.object(path).valueChanges()
            .catch((error) => this.handleErrors(error, path));
    }

    public updateDbObject(obj: IKeyValue[], ...params: string[]) {
        const path = this.getPath(params);
        const dbObject = this.db.object(path);
        const newObj = {};
        obj.forEach(c => newObj[c.key] = c.value);
        return dbObject.update(newObj).catch((error) => this.handleErrors(error, path));
    }

    public updateObject(obj: any, ...params: string[]) {
        const path = this.getPath(params);
        const dbObject = this.db.object(path);
        return dbObject.update(obj).catch((error) => this.handleErrors(error, path));
    }

    public removeObject(...params: string[]) {
        const path = this.getPath(params);
        const dbObject = this.db.object(path);
        return dbObject.remove().catch((error) => this.handleErrors(error, path));
    }

    private getPath(params: string[]) {
        const sections = params.map(p => p.trim().toLowerCase());
        const path = sections.join('/');
        return path;
    }

    private handleErrors(error: Response, url: string) {
        console.error('=== Failed to request HTTP service with URL below === ');
        console.warn(url);
        const errorMessage = JSON.stringify(error);
        console.log(error);
        return Observable.throw(error);
    }
}

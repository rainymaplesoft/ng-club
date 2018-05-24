// https://coryrylan.com/blog/angular-observable-data-services

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from '../../Module_Core/index';
import { Observable, BehaviorSubject } from 'rxjs';

export class BaseData {
  id: number | string;
  getName() {
    return (<any>this).constructor.name;
    // OR return (this as any).constructor.name;
  }
}

export class Todo extends BaseData {
  id: number | string;
  createdAt: number;
  value: string;
}

@Injectable()
export class DataStoreService {
  todos: Observable<Todo[]>;
  private _todos: BehaviorSubject<Todo[]>;
  private baseUrl: string;
  private dataStore: { todos: Todo[] };

  constructor(private http: HttpService) {
    this.baseUrl = 'http://56e05c3213da80110013eba3.mockapi.io/api';
    this.dataStore = { todos: [] };
    this._todos = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    this.todos = this._todos.asObservable();
  }

  getDataObject<T>(objectClass: BaseData, isCollection = false): T | Array<T> {
    const key = Object.keys(this.dataStore).find(obj => {
      if (isCollection) {
        if (!Array.isArray(this.dataStore[obj])) {
          return false;
        }
        return this.dataStore[obj][0].getName() === objectClass[0].getName();
      } else {
        if (Array.isArray(this.dataStore[obj])) {
          return false;
        }
        return this.dataStore[obj].getName() === objectClass.getName();
      }
    });
    return this.dataStore[key];
  }

  // usage:
  // dataService.loadAll<Todo[]>(new Todo(),url);

  loadAll<T>(objectClass: BaseData, url: string) {
    // url = `${this.baseUrl}/todos`;
    this.http.getData<T>(url).subscribe(
      data => {
        let dataObject = this.getDataObject<T>(objectClass, true);
        dataObject = data;
        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load todos.')
    );
  }

  // usage:
  // dataService.load<Todo>(1, new Todo(), url);

  load<T>(id: number | string, objectClass: BaseData, url: string) {
    url = `${this.baseUrl}/todos/${id}`;
    this.http.getData<T>(url).subscribe(
      data => {
        let notFound = true;

        const dataObject = this.getDataObject<T>(objectClass, true);
        if (Array.isArray(dataObject)) {
          dataObject.forEach((item, index) => {
            if (item['id'] === data['id']) {
              dataObject[index] = data;
              notFound = false;
            }
          });
          if (notFound) {
            dataObject.push(data);
          }
        }

        this._todos.next(Object.assign({}, this.dataStore).todos);
      },
      error => console.log('Could not load todo.')
    );
  }

  /*
    create(todo: Todo) {
      this.http.post(`${this.baseUrl}/todos`, JSON.stringify(todo)).subscribe(
        data => {
          this.dataStore.todos.push(data);
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not create todo.')
      );
    }

    update(todo: Todo) {
      this.http
        .put(`${this.baseUrl}/todos/${todo.id}`, JSON.stringify(todo))
        .subscribe(
          data => {
            this.dataStore.todos.forEach((t, i) => {
              if (t.id === data.id) {
                this.dataStore.todos[i] = data;
              }
            });

            this._todos.next(Object.assign({}, this.dataStore).todos);
          },
          error => console.log('Could not update todo.')
        );
    }

    remove(todoId: number) {
      this.http.delete(`${this.baseUrl}/todos/${todoId}`).subscribe(
        response => {
          this.dataStore.todos.forEach((t, i) => {
            if (t.id === todoId) {
              this.dataStore.todos.splice(i, 1);
            }
          });
          this._todos.next(Object.assign({}, this.dataStore).todos);
        },
        error => console.log('Could not delete todo.')
      );
    }
    */
}

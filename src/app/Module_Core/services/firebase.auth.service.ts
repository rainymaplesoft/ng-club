import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class FireAuthService {
    user$: Observable<firebase.User>;

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        this.user$ = this.afAuth.authState;
    }

    login(routeOk: string, routeFaile = '/') {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(
            d => this.router.navigate([routeOk]),
            e => this.router.navigate([routeFaile])
            ).catch(error => console.log('auth error', error));
    }

    logout(route = '/') {
        this.afAuth.auth.signOut();
        this.router.navigate([route]);
    }
}

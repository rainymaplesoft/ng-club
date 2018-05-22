import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatButtonModule
} from '@angular/material';
import { NgTranslateModule } from './translate.module';
import {
  HttpService,
  StorageService,
  JwtAuthService,
  ToastrService,
  UtilService,
  LayoutService,
  AnimationModule,
  DialogModule,
  ValidatorService,
  ExceptionComponent,
  DialogService,
  ToggleComponent,
  SafeHtmlPipe,
  FilterOutPipe,
  FilterPipe,
  AngularFireService,
  SpinnerComponent
} from './export';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { PubSubService } from './services/pubsub.service';

const fireConfig = {
  apiKey: 'AIzaSyAibEsyEdtFISxVE52i3GP6AY85QP8jMZw',
  authDomain: 'pcg-edplan-i18n.firebaseapp.com',
  databaseURL: 'https://pcg-edplan-i18n.firebaseio.com',
  projectId: 'pcg-edplan-i18n',
  storageBucket: 'pcg-edplan-i18n.appspot.com',
  messagingSenderId: '187895064797'
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DialogModule,
    AnimationModule,
    NgTranslateModule,
    AngularFireModule.initializeApp(fireConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [
    ToggleComponent,
    ExceptionComponent,
    SafeHtmlPipe,
    FilterOutPipe,
    FilterPipe,
    SpinnerComponent
    // TranslatePipe
  ],
  declarations: [
    SafeHtmlPipe,
    FilterOutPipe,
    FilterPipe,
    ExceptionComponent,
    SpinnerComponent
  ],
  entryComponents: [],
  providers: [
    HttpService,
    StorageService,
    JwtAuthService,
    ToastrService,
    UtilService,
    LayoutService,
    ValidatorService,
    DialogService,
    PubSubService,
    AngularFireService
  ]
})
export class CoreModule {}

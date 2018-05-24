import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// Module_Core Imports
// import { CoreModule, NgTranslateModule } from './Module_Core';
import { CoreModule } from './Module_Core/core.module';
import { NgTranslateModule } from './Module_Core/translate.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, NgTranslateModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

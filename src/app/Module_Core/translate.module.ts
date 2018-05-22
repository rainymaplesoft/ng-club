import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core/src/translate.pipe';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';
import { Observable } from 'rxjs/Observable';
import { AngularFireService } from './services/firebase.service';
import { Config } from './config.core';
import { LocalJsonTransLoaderFactory, FbTransLoaderFactory, HttpLoaderFactory } from './translation';


@NgModule({
    imports: [
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: LocalJsonTransLoaderFactory,
                // useFactory: HttpLoaderFactory,
                deps: [HttpClient]
                // useFactory: FbTransLoaderFactory,
                // deps: [AngularFireService]
            }
        })
    ],
    exports: [TranslatePipe, TranslateModule],
    declarations: [],
    providers: [TranslateStore],
})
export class NgTranslateModule {

}

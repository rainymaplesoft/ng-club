import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { AppAuthService } from './auth.service';
import {
  PendingChangesGuard,
  AuthenticateGuard,
  StaffAuthenticateGuard,
  SysAdminAuthenticateGuard
} from './authenticateGuard.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ApiService,
    AppAuthService,
    PendingChangesGuard,
    AuthenticateGuard,
    StaffAuthenticateGuard,
    SysAdminAuthenticateGuard
  ]
})
export class AppCommonModule {}

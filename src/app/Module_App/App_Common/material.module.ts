import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatChipsModule, MatInputModule, MatProgressSpinnerModule,
  MatDatepickerModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSidenavModule, MatRippleModule,
  MatTabsModule, MatProgressBarModule, MatDialogModule, MatTooltipModule, MatSnackBarModule, MatAutocompleteModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatIconModule, MatChipsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSidenavModule, MatTabsModule, MatProgressBarModule,
    MatDialogModule, MatTooltipModule, MatSnackBarModule, MatAutocompleteModule, MatRippleModule, MatProgressSpinnerModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatChipsModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSidenavModule, MatTabsModule,
    MatProgressBarModule, MatDialogModule, MatTooltipModule, MatSnackBarModule, MatAutocompleteModule, MatRippleModule,
    MatProgressSpinnerModule
  ],
  declarations: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-GB' },
  ]
})
export class AppMaterialModule { }

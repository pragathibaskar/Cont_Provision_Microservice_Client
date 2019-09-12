/*
  Imports all of the Angular Material components that we will use in this application
*/
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
// angular animations required for material design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCheckboxModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSidenavContent,
  MatSidenav
} from '@angular/material';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule
  ],
})
export class CoreModule { }

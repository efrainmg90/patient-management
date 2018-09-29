import { MatPaginatorImpl } from './mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatCardModule, MatDialogModule, MatSortModule, MatPaginatorIntl, MAT_DATE_LOCALE } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatSortModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatSortModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX'}
  ]  ,
  declarations: []
})
export class MaterialModule { }

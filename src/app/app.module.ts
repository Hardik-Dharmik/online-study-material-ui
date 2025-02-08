import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { AllPdfsComponent } from './components/all-pdfs/all-pdfs.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ClassesComponent } from './components/classes/classes.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PrimeNGModule } from './primeng/primeng.module';
import { PdfFormComponent } from './components/pdfs/pdf-form/pdf-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AllPdfTableComponent } from './components/all-pdfs/all-pdf-table/all-pdf-table.component';
import { AllPdfListComponent } from './components/all-pdfs/all-pdf-list/all-pdf-list.component';
import { PdfExpansionContentComponent } from './components/all-pdfs/all-pdf-list/pdf-expansion-content/pdf-expansion-content.component';
import { PdfPreviewDialogComponent } from './components/all-pdfs/all-pdf-list/pdf-expansion-content/pdf-preview-dialog/pdf-preview-dialog.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxSpinnerModule } from "ngx-spinner";
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, LoginFormComponent, UserLayoutComponent, UserDashboardComponent, AllPdfsComponent, SubjectsComponent, ClassesComponent, SignUpComponent, ProfileComponent, PdfFormComponent, AllPdfTableComponent, AllPdfListComponent, PdfExpansionContentComponent, PdfPreviewDialogComponent, ExamplePdfViewerComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    PrimeNGModule,
    NgxExtendedPdfViewerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-atom' })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

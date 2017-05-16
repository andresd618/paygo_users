import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './components/users/list/list.component';
import { UploadComponent } from './components/users/upload/upload.component';
import { RecordComponent } from './components/users/record/record.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UploadComponent,
    RecordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

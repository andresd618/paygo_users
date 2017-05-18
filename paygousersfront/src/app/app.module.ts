import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './components/users/list/list.component';
import { UploadComponent } from './components/users/upload/upload.component';
import { RecordComponent } from './components/users/record/record.component';
import {Ng2PaginationModule} from 'ng2-pagination'; // <-- import the module
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    UploadComponent,
    RecordComponent,
  ],
  imports: [
    BrowserModule, 
    ModalModule.forRoot(),
    BootstrapModalModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2PaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

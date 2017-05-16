import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import {ApirestService} from "../../../services/users/apirest.service";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers : [ApirestService]
})
export class UploadComponent implements OnInit {

  errors: Array<Object> = [];
  file : File;


  constructor(/*private _router: Router,*/private _api : ApirestService) {
     
   }

   /**
    * Se procesan los errores retornados por el api rest
    */
   processErrors(error){
     
      this.errors = [];
      let errors = error.json();
      for(var key in errors) {
          this.errors.push(errors[key]);
      }
    
   }

  ngOnInit() {
  }



  getFile(event){
    this.file = event.target.files[0]; 
  }


  onSubmit(){
      this._api.uploadUsers(this.file).then(
        (res) => {
         // this._router.navigate(['/users']);
        },
        (error) => {
          this.processErrors(error);
        }
      );
  }
}

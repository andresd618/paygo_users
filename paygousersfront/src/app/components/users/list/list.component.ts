import { Component, OnInit } from '@angular/core';
import {ApirestService} from "../../../services/users/apirest.service";

import { 
  FormControl,
  FormBuilder,  
  FormGroup  
} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  formUploadUsers : FormGroup;
  users: Object;
  selectedUser: Object = {};

  constructor(private _api : ApirestService) {

      this.users = this._api.users$;

      this.formUploadUsers = new FormGroup({
        numrecords : new FormControl(),
        typeorder : new FormControl()
      });
   }



  ngOnInit() {
  }

  onSubmit(form : any){

    console.log(form);
  }

}

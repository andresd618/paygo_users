import { Component, OnInit } from '@angular/core';
import {ApirestService} from "../../../services/users/apirest.service";
import {IUser} from '../../../interfaces/IUser';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import { FormControl,FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers : [ApirestService]
})
export class ListComponent implements OnInit {

  numrecords : number;
  typeorder : string;  

  errors : String = "";
  formListUsers : FormGroup;   
  _dataStore: {
    users : IUser[]
  };


  constructor(private _api : ApirestService) {      

      this.typeorder = 'asc';      

      this.formListUsers = new FormGroup({
        numrecords : new FormControl(),
        typeorder : new FormControl()
      });
   }



  ngOnInit() {    
    this._dataStore = { users: []};
  }

  /**
   * Limpia los mensajes 
   */
  cleanMsgs(){
    this.errors = "";   
  }


  consultUsers(page : number){

    if(this.numrecords && this.typeorder){

      this._api.getUsers(this.numrecords, 'name', this.typeorder).subscribe(

        (res) => {
            
              this._dataStore.users = res.result.data;
          },
          (error) => {
            let erorrs = error.json();
            this.errors = erorrs.msg;
          }
      );
    }else{
      this.errors = "Debe ingresar un valor numerico y seleccionar un tipo de ordenamiento.";
    }
  }


  /**
   * Obtiene el listado de usuarios segun la cantidad de registros y el tipo de ordenamiento seleccionado
   */
  getUsers(){

    this.numrecords = this.formListUsers.get("numrecords").value;
    this.typeorder = this.formListUsers.get("typeorder").value;      

    this.consultUsers(1);
  }

 

}

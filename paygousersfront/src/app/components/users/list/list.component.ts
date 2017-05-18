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
  currentPage : number = 1;
  infoPagination : Object;

  errors : String = "";
  formListUsers : FormGroup;   
  _dataStore: {
    users : IUser[]
  };


  constructor(private _api : ApirestService) {      

      this.infoPagination = {
          total : 0,
          lastPage : 0,
          from : 0,
          to : 0,
          itemsPerPage : 0,
          currentPage : 0
      };

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

    this.currentPage = page;    
    this.infoPagination = {};    

    if(this.numrecords && this.typeorder){

      this._api.getUsers(this.numrecords, 'name', this.typeorder, page).subscribe(

        (res) => {
              
              this.infoPagination = {

                  total : res.result.total,
                  lastPage : res.result.last_page,
                  from : res.result.from,
                  to : res.result.to,
                  itemsPerPage : res.result.per_page,
                  currentPage : res.result.current_page
              };
              
              console.log(this.infoPagination);
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


  public pageChanged(event : any){

    this.consultUsers(event);    
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

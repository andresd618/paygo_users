import { Component, Input,OnInit } from '@angular/core';
import {IUser} from '../../../interfaces/IUser';
import {ApirestService} from "../../../services/users/apirest.service";

@Component({
  selector: 'tbody.app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
  providers : [ApirestService]
})
export class RecordComponent implements OnInit {

  userEdit : IUser;
  @Input('user') user : IUser;
  @Input('isUpdate') isUpdate : boolean = false;
  @Input('isChecked') isChecked : boolean = false;

  constructor(private _api : ApirestService) { }

  /**
   * Se habilitan los campos para editar el usuario
   */
  editUser(){

    ///Se clona el objeto user    
    this.userEdit =  Object.assign({},this.user);
    this.isUpdate = true;
  }

  /**
   * Se guardan los cambios realizados a la informacion de un usuario
   */
  saveUser(user : IUser){
    
    if(user && user.name && user.lastname){

      this._api.updateUser(user).subscribe(
        (res) =>{
            this.user = Object.assign({},user);
            this.isUpdate = false;
        },
        (error) => {

        }
      );      
    }else{
      
    }
  }


/**
 * Cancela la edicion de un usuario
 */
  cancelEdit(){

    this.isUpdate = false;
    this.userEdit = null;    
  }


  ngOnInit() {}

}

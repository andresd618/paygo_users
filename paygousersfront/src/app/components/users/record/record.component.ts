import { Component, Input,OnInit, ViewContainerRef } from '@angular/core';
import {IUser} from 'app/interfaces/iuser';
import {ApirestService} from "app/services/users/apirest.service";
import { Modal } from 'angular2-modal/plugins/bootstrap';

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

  constructor(vcRef: ViewContainerRef, private _api : ApirestService, private modal : Modal) {
      modal.overlay.defaultViewContainer = vcRef;
   }

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
            this.mostrarModalAlert('Editar usuario','Error al guardar los cambios realizados.');
        }
      );      
    }else{
      this.mostrarModalAlert('Información incorrecta','Debe ingresar nombre y apellido válidos.');
    }
  }


/**
 * Cancela la edicion de un usuario
 */
  cancelEdit(){

    this.isUpdate = false;
    this.userEdit = null;    
  }


  /**
 * Muestra un modal informativo, con el titulo y el contenido 
 */
  mostrarModalAlert(titulo : string, texto : string){

    this.modal.alert()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title(titulo)
      .titleHtml(titulo)
      .body(texto)
      .open();
  }

  ngOnInit() {}

}

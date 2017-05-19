import { Component, OnInit, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import {ApirestService} from "app/services/users/apirest.service";
import {IUser} from 'app/interfaces/iuser';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import { FormControl,FormBuilder, FormGroup} from '@angular/forms';
import {RecordComponent} from '../record/record.component';
import { Modal } from 'angular2-modal/plugins/bootstrap';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers : [ApirestService]
})
export class ListComponent implements OnInit {

  @ViewChildren(RecordComponent) recordComponents: QueryList<RecordComponent>;
  checkAll : boolean = false;
  numrecords : number;
  typeorder : string;  
  currentPage : number = 1;
  infoPagination : Object;

  errors : String = "";
  formListUsers : FormGroup;   
  _dataStore: {
    users : IUser[]
  };


  constructor(vcRef: ViewContainerRef, private _api : ApirestService, private modal : Modal) {      

      modal.overlay.defaultViewContainer = vcRef;
      this._dataStore = { users: []};

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



  /**
   * Limpia los mensajes 
   */
  cleanMsgs(){
    this.errors = "";   
  }

/**
 * Realiza la consulta de los usuarios segun la pagina, el orden y la cantidad de registros a consultar por pag
 */
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
                            
              this._dataStore.users = res.result.data;
          },
          (error) => {
            this.errors = error.json().msg;            
          }
      );
    }else{
      this.errors = "Debe ingresar un valor numerico y seleccionar un tipo de ordenamiento.";
    }
  }


  /**
   * Muestra la ventana que solicita confirmacion para realizar la eliminacion de los usuarios
   */
  confirmDeleteUsers(){

    this.modal.confirm()
        .size('lg')
        .isBlocking(true)
        .showClose(true)
        .keyboard(27)
        .title('Eliminar usuarios')
        .titleHtml('Eliminar usuarios')
        .body('Desea elminar los usuarios seleccionados?')
        .open()
        .then((dialog:any) => {return dialog.result})
        .then((result:any) => {this.deleteUsers()});  ///Si acepta la confirmacion se eliminan los usuarios        
  }

  /**
   * Se eliminan los usuarios seleccionados
   */
  deleteUsers(){

      let userIDS : number[]= []; 

      //Se obtienen los ids de los usuarios seleccionados para eliminar
      this.recordComponents.forEach(function(recordUser){
          console.log(recordUser);
          if(recordUser.isChecked){
              userIDS.push(recordUser.user.id);
          }          
      });

      //Si hay usuarios seleccionados para eliminar se eliminan
      if(userIDS && userIDS.length > 0){

          this._api.deleteUsers(userIDS) .subscribe(
            (res) => {
                this.consultUsers(this.currentPage);  ///Si se eliminan, se vuelve a hacer la consulta al server
                this.mostrarModalAlert('Usuarios eliminados',res.msg);///Mostrar modal exito
            }, 
            (error) => {                
                this.mostrarModalAlert('Eliminación de usuarios', error.json().msg);///Mostrar modal error
            }
          );
      }else{
        this.mostrarModalAlert('Eliminación de usuarios', 'Debe seleccionar usuarios para eliminar.');///Mostrar modal error
      }
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

  /**
   * selecciona/deselecciona todos los checkbox cuando cambia el valor del check Todos
  */
  checkDeleteAll(){
      this.checkAll = !this.checkAll;
  }

  /**
   * Conslta los usuarios correspondientes a una pagina seleccionada en el paginador
   */
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

 
  ngOnInit(){}
}

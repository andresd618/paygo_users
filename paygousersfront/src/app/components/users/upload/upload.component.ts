import { Component, OnInit, ViewChild  } from '@angular/core';
import {ApirestService} from "app/services/users/apirest.service";
import { FormControl,FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers : [ApirestService]
})
export class UploadComponent implements OnInit {

  errors:  String = "";
  sucessMsg: String = "";
  warningMsg: String = "";
  file : File;
  formUploadUsers : FormGroup;
  processing : boolean;   ///Usado para habilitar/deshabilitar el boton subir

  @ViewChild('inpFileUpload')
  inpFileUpload: any;

  constructor(private _api : ApirestService) {
     this.formUploadUsers = new FormGroup({});
     this.processing = false;
   }

   ngOnInit(){}
   
  /**
   * Limpia los mensajes de exito, error y warning
   */
  cleanMsgs(){
    this.errors = "";
    this.sucessMsg = "";
    this.warningMsg = "";
  }

  /**
   * Obtiene el archivo seleccionado en el input file
   */
  getFile(event){
    this.cleanMsgs();
    this.file = event.target.files[0]; 
  }


  /**
   * Realiza la importacion de usuarios desde el archivo CSV
   */
  uploadUsers(){
      
      this._api.uploadUsers(this.file).subscribe(

          (res) => {
              this.processing = false; ///Se habilita el boton subir

              if(res.status){
                  this.sucessMsg = res.msg;
              }else{
                this.warningMsg = res.msg;
              }

              //Se limpia el input file
              this.inpFileUpload.nativeElement.value = "";
          },
          (error) => {
            this.processing = false;
            this.errors = error.json().msg;            
          }
      );
  }



  /**
   * Elimina los usuarios registrados en la bd y Se carga el archivo CSV e inicia la importacion de los usuarios
   */
  onSubmit(){

      //Se valida que se haya seleccionado un archivo 
      if(this.file){

          this.cleanMsgs();

          this.processing = true; //Se deshabilita el boton subir

          ///Primero se eliminan los usuarios de la bd (truncate)
          this._api.deleteAllUsers().subscribe(
              (res) => {
                  if(res.status){
                    ///Si se eliminan los usuarios se cargan los nuevos
                    this.uploadUsers();
                  }else{
                    this.processing = false; 
                    this.warningMsg = res.msg;
                  }
              },
              (error) => {
                this.processing = false;
                this.errors = error.json().msg;                
              }            
          );          
      }else{
        this.errors = "Debe selecccionar un archivo CSV para importar los usuarios.";
      }
  }
}

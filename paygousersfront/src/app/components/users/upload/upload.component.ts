import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import {ApirestService} from "../../../services/users/apirest.service";
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


  constructor(/*private _router: Router,*/private _api : ApirestService) {
     this.formUploadUsers = new FormGroup({});
   }

   

  ngOnInit() {
  }

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


  uploadUsers(){

      this._api.uploadUsers(this.file).subscribe(

          (res) => {
              if(res.status){
                  this.sucessMsg = res.msg;
              }else{
                this.warningMsg = res.msg;
              }
          },
          (error) => {
            
            let errors = error.json();
            this.errors = errors['msg'];
          }
      );
  }


  /**
   * Se carga el archivo CSV e inicia la importacion de los usuarios
   */
  onSubmit(){

      if(this.file){

          this.cleanMsgs();

          ///Primero se eliminan los usuarios de la bd (truncate)
          this._api.deleteAllUsers().subscribe(
              (res) => {
                  if(res.status){
                    ///Si se eliminan los usuarios se cargan los nuevos
                    this.uploadUsers();
                  }else{
                    this.warningMsg = res.msg;
                  }
              },
              (error) => {
                let errors = error.json();
                this.errors = errors['msg'];
              }            
          );
          
      }else{
        this.errors = "Debe selecccionar un archivo CSV para importar los usuarios.";
      }
  }
}

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


  formListUsers : FormGroup;   
  //users$ : Observable<IUser[]>;
  //private _usersObserver: Observer<IUser[]>;
  _dataStore: {
    users : IUser[]
  };


  constructor(private _api : ApirestService) {      

      this.formListUsers = new FormGroup({
        numrecords : new FormControl(),
        typeorder : new FormControl()
      });
   }



  ngOnInit() {
    //this.users$ = new Observable( observer => this._usersObserver = observer).share();
    this._dataStore = { users: []};
  }


  getUsers(){

    let numrecords : number = this.formListUsers.get("numrecords").value;
    let typeorder : string = this.formListUsers.get("typeorder").value;    

    this._api.getUsers(numrecords, 'name', typeorder).subscribe(

      (res) => {
          
            this._dataStore.users = res.result.data;
            //this._usersObserver.next(this._dataStore.users);
         // this._router.navigate(['/users']);
        },
        (error) => {
          //this.processErrors(error);
        }
    );
  }

 

}

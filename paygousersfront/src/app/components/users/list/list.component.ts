import { Component, OnInit } from '@angular/core';
import {ApirestService} from "../../../services/users/apirest.service";



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: Object;
  selectedUser: Object = {};

  constructor(private _api : ApirestService) {
      this.users = this._api.users$;
      //this._api.getUsers();
   }



  ngOnInit() {
  }

}

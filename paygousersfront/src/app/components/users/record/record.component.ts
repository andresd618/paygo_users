import { Component, Input,OnInit } from '@angular/core';
import {IUser} from '../../../interfaces/IUser';

@Component({
  selector: 'tbody.app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input('user') user : IUser;
  @Input('isUpdate') isUpdate : boolean = false;

  constructor() { }

  editUser(){
    this.isUpdate = true;
  }

  saveUser(user : IUser){
    this.user = user;
    this.isUpdate = false;
  }

  ngOnInit() {
  }

}

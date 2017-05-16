import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  file = File;
  

  constructor() { }

  ngOnInit() {
  }

  getFile(event){
    this.file = event.target.files[0]; 
  }

}

import {Component} from '@angular/core';
// import { Router } from '@angular/router';
import {AddNewService} from 'src/app/core/services/addnew/addNew.service';

@Component({
  selector: 'app-body-top',
  templateUrl: './body-top.component.html',
  styleUrls: ['./body-top.component.css'],
})
export class BodyTopComponent {
  constructor(private _addNewService: AddNewService) {
  }

  showAddNewTask() {
    this._addNewService.newTask = true;
  }
}

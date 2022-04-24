import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AddNewService } from 'src/app/services/addnew/addNew.service';

@Component({
  selector: 'app-body-top',
  templateUrl: './body-top.component.html',
  styleUrls: ['./body-top.component.css'],
})
export class BodyTopComponent implements OnInit {
  constructor(private _addNewService: AddNewService) {}

  ngOnInit(): void {}

  showAddNewTask() {
    this._addNewService.newTask = true;
  }
}

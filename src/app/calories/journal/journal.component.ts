import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  displayedColumns = ['date','meal','quantity','calories'];

  @ViewChild (MatSort,{static: true }) sort:MatSort;
  @ViewChild (MatPaginator,{static: true }) paginator:MatPaginator;

  constructor() { }

  ngOnInit() {
  }

}

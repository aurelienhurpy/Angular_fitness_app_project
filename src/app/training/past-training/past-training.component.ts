import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Exercice } from 'src/app/models/exercice';
import { TrainingService } from 'src/app/services/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  // definition des colonnes à afficher -> correspond aux noms des differentes colonnes

  displayedColumns = ['date','name','duration','calories','state'];

  dataSource = new MatTableDataSource<Exercice>();

  private exChangedSubscription:Subscription;

  @ViewChild (MatSort,{static: true }) sort:MatSort;
  @ViewChild (MatPaginator,{static: true }) paginator:MatPaginator;

  

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {

    this.exChangedSubscription = this.trainingService.finishedExercicesChanged.subscribe((exercices:Exercice[])=>{
      this.dataSource.data=exercices;
    });

    this.trainingService.getCompletedOrCanceledExercice();

  }

  ngAfterViewInit(){

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  doFilter(filterValue:string){

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  ngOnDestroy(){

    this.exChangedSubscription.unsubscribe();

  }

}

export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items par page';
  nextPageLabel     = 'Page Prochaine';
  previousPageLabel = 'Page Précedente';
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercice } from '../../models/exercice';
import { TrainingService } from 'src/app/services/training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercices: Exercice[];

  exercicesSubscription:Subscription;

  isLoading:boolean = true;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {

    this.exercicesSubscription = this.trainingService.exercicesChanged.subscribe(
      exercices=>{
        this.isLoading = false;
        this.exercices=exercices
      });
    this.trainingService.getAvailableExercice();   

  }

  onStartTraining(form:NgForm){

    this.trainingService.startExercice(form.value.exercice);

  }

  ngOnDestroy(){
    this.exercicesSubscription.unsubscribe();
  }

}

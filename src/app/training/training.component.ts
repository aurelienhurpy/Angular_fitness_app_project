import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining:boolean;
  exerciceSubscription:Subscription;

  constructor(private trainingService:TrainingService) { }

  ngOnInit() {

    // this.onGoingTraining = false;

    this.exerciceSubscription = this.trainingService.exerciceChanged.subscribe(
      exercice =>{
        if(exercice){
          this.onGoingTraining = true;
        }else{
          this.onGoingTraining = false;
        }
      });

  }

  

}

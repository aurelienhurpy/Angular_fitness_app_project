import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/MealService';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  meal:Meal[];

  constructor(private mealService:MealService) { }

  ngOnInit() {
  }

  onSubmit(_form:NgForm){

    // console.log(_form.value);
    this.mealService.addMeal();

    

  }

}

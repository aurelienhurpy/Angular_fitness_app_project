import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Meal } from '../models/meal';

@Injectable()
export class MealService {

    private firebaseSubscription:Subscription[] = [];
    private meal: Meal;

    // private newmeal:Meal;

    constructor(private db:AngularFirestore){}


    addMeal(){

// console.log(this.meal);

        this.addDataToDatabase(
            {
                ...this.meal,
                name:this.meal.name,
                date:new Date(),
                
            });

          
            

    }

    private addDataToDatabase(meal:Meal){

        this.db.collection('meal').add(meal);

    }

    cancelSubscription(){

        this.firebaseSubscription.forEach(sub=> sub.unsubscribe());

    }

}
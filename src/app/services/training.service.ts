import { Injectable } from '@angular/core';
import { Exercice } from '../models/exercice';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {

    exerciceChanged = new Subject<Exercice>();

    exercicesChanged = new Subject<Exercice[]>();

    private availableExercices:Exercice[] = [];

    private runningExercice:Exercice;

    finishedExercicesChanged = new Subject<Exercice[]>();

    private firebaseSubscription:Subscription[] = [];

    constructor(private db:AngularFirestore){}

    getAvailableExercice(){

        this.firebaseSubscription.push(this.db.collection('availableExercices')
                            .snapshotChanges()
                            .pipe(
                              map(
                                docArray =>{
                                  return docArray.map(
                                    doc => {
                                      return {
                                        id:doc.payload.doc.id,
                                        ...doc.payload.doc.data()
                                      } as Exercice
                                    }
                                  );
                                }))
                            .subscribe(
                                (exercices:Exercice[])=>{
                                    this.availableExercices = exercices;
                                    this.exercicesChanged.next([...this.availableExercices]);
                                }));

    }

    startExercice(selectedId:string){

        this.runningExercice = this.availableExercices.find(
            ex => ex.id === selectedId
        );

        this.exerciceChanged.next({...this.runningExercice});

    }

    completeExercice(){

        this.addDataToDatabase(
            {
                ...this.runningExercice,
                date:new Date(),
                state:'completé'
            });

            // on remet à 0

            this.runningExercice = null;
            this.exerciceChanged.next();

    }

    cancelExercice(progress:number){

        this.addDataToDatabase(
            {
                ...this.runningExercice,
                date:new Date(),
                duration:this.runningExercice.duration * (progress/100),
                calories:this.runningExercice.calories * (progress/100),
                state:'annulé'
            });

            // on remet à 0

            this.runningExercice = null;
            this.exerciceChanged.next();

    }

    getRunningExercice(){

        return{...this.runningExercice};

    }

    getCompletedOrCanceledExercice(){

        this.firebaseSubscription.push(this.db.collection('finishedExercices')
                .valueChanges()
                .subscribe((exercices:Exercice[])=>{
                    this.finishedExercicesChanged.next(exercices);
                }));

    }

    private addDataToDatabase(exercice:Exercice){

        this.db.collection('finishedExercices').add(exercice);

    }

    cancelSubscription(){

        this.firebaseSubscription.forEach(sub=> sub.unsubscribe());

    }

}
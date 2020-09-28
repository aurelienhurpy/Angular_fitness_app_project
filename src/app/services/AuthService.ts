import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from '../models/AuthData';
import { Subject } from 'rxjs/Subject';
import { TrainingService } from './training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from './UIService';
 
@Injectable()
export class AuthService{

    constructor(private router:Router, private afAuth:AngularFireAuth, private trainingService:TrainingService, private snackbar:MatSnackBar, private uiService:UIService){}

    authChange = new Subject<boolean>();

    private isAuthenticated:boolean=false;

    initAuthListener(){

        this.afAuth.authState.subscribe(user=>{
            if(user){
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/']);
            }else{
                this.trainingService.cancelSubscription();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });

    }

    // methode pour s'enregistrer (registerUser)

    registerUser(authData:AuthData){

        this.uiService.loadingStateChanges.next(true);
        this.afAuth.auth
        .createUserWithEmailAndPassword(authData.email,authData.password)
        .then(result=>{
            this.uiService.loadingStateChanges.next(false);  
        })
        .catch(error=>{
            this.uiService.loadingStateChanges.next(false);
            this.snackbar.open(error.message,null,{duration:3000});
        })


    }

    // connexion (login)

    login(authData:AuthData){

        this.uiService.loadingStateChanges.next(true);
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email,authData.password)
            .then(result=>{
                this.uiService.loadingStateChanges.next(false);
            })
            .catch(error=>{
                this.uiService.loadingStateChanges.next(false);
                this.snackbar.open(error.message,null,{duration:3000});
            })

        

    }

    // deconnexion (logout)

    logout(){

        this.afAuth.auth.signOut();

    }

    // verification si authentifié ou pas -> isAuth (booleen)

    isAuth(){

        return this.isAuthenticated;

    }

}
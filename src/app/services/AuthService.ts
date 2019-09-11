import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthData } from '../models/AuthData';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class AuthService{

    constructor(private router:Router){}

    authChange = new Subject<boolean>();

    private user:User;

    // methode pour s'enregistrer (registerUser)

    registerUser(authData:AuthData){

        this.user = {
            email:authData.email,
            userId:Math.round(Math.random() * 10000).toString()
        };

        this.authSuccessfully();


    }

    // connexion (login)

    login(authData:AuthData){

        this.user = {
            email:authData.email,
            userId:Math.round(Math.random() * 10000).toString()
        };

        this.authSuccessfully();

    }

    // deconnexion (logout)

    logout(){

        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);

    }

    // Aller chercher un utilisateur (getUser)

    getUser(){

        // methode spread (faire la copie d'un objet)

        return { ...this.user };

    }

    // verification si authentifié ou pas -> isAuth (booleen)

    isAuth(){

        return this.user == null;

    }

    private authSuccessfully(){

        this.authChange.next(true);
        this.router.navigate(['/']);

    }
}
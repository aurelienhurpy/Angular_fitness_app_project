import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/AuthService';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService, private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){

        if(this.authService.isAuth()){
            return true;
        }else{
            this.router.navigate(['/login']);
        }
        

    }

    

}
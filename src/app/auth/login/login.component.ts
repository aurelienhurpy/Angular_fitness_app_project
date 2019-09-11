import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor( private authService:AuthService) { }

  ngOnInit() {

    this.loginForm = new FormGroup(
      {
        email: new FormControl(
          '',
          {
            validators:
              [
                Validators.required,
                Validators.email
              ]
          }),
        password: new FormControl(
          '',
          {
            validators:
              [
                Validators.required,
                Validators.pattern(/[0-9a-zA-Z]{6}/)
              ]
          })
      });

  }

  // onSubmit(form:NgForm){

  //   console.log(form);

  // }

  onSubmit(){

    this.authService.login(
      {email: this.loginForm.value.email,
       password: this.loginForm.value.password
      });

  }

}
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor() { }

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

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    console.log(this.loginForm);

  }

}
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  maxDate;

  constructor(private authService:AuthService) { }

  ngOnInit() {

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);

  }

  onSubmit(form:NgForm){

    console.log(form);

    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });

  }

}

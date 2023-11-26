import { Component } from '@angular/core';

import { ErrorStateMatcher } from '@angular/material/core';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { PagesServiceService } from '../pages-service/pages.service.service';
import { login } from '../Interfaces/user.interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  userlog = '';

  user = {
    user: '',
    password: '',
    username:''
  }

  constructor( private pagesService: PagesServiceService, private router: Router ) { }

  login(){

    const user: login = { email: this.user.username, password: this.user.password }

    this.pagesService.login( user ).subscribe((data:any) => {
      console.log(data.token);
      
      localStorage.setItem('token', data.user_id.token);
      this.router.navigate(['/home']);
      

    });
    console.log(this.user);
    this.userlog = this.user.user;
  }

  register(){
    this.user.username = this.user.user;
    console.log(this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}

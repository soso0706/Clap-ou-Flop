import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersApi } from '../services/users-api';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  imports: [RouterLink, FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
})
export class Connexion {

  user:User={
    firstName:'',
    lastName:'',
    age:0,
    email:'',
    points:0
  };

  email: string='';
  errorMessage:string='';


  constructor(private usersApi:UsersApi, private router: Router){}

  onSubmit(){
    this.errorMessage='';
    this.usersApi.getByEmail(this.email).subscribe({
      next:(user)=>{
        if(user && user.email){
          localStorage.setItem('userEmail', user.email);
          this.router.navigate(['/compte-user']);
        } else {
          this.errorMessage='Email introuvable, veuillez réessayer.';
          console.log(this.errorMessage)
        }
      },
      error:()=>{
        this.errorMessage='Email introuvable, veuillez réessayer.';
      }
    });
  }

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersApi } from '../services/users-api';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
})
export class Inscription {

  user:User={
    firstName:'',
    lastName:'',
    age:0,
    email:'',
    points:0
  };

  private readonly usersApi = inject(UsersApi);
  private readonly router = inject(Router);

createUser(): void {
    this.usersApi.createUser(this.user).subscribe(() =>{ 
        localStorage.setItem('userEmail', this.user.email);
        this.router.navigate(['/compte-user']);
    });
 }
}

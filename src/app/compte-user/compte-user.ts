import { Component, OnInit, inject } from '@angular/core';
import { User } from '../models/user';
import { UsersApi } from '../services/users-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compte-user',
  imports: [],
  templateUrl: './compte-user.html',
  styleUrl: './compte-user.scss',
})
export class CompteUser {

  private readonly usersApi = inject(UsersApi);

  user!:User;
  constructor(private router:Router){}
  ngOnInit(): void{
    const email = localStorage.getItem('userEmail');
    
    if(email){
      this.usersApi.getByEmail(email).subscribe((data) =>{
        this.user=data;
      });
    }
  }

  
  

    

}



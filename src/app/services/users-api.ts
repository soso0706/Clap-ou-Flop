import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root',
})

export class UsersApi {
  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/users"

  currentUser:User={
  firstName:'',
    lastName:'',
    age:0,
    email:'',
    points:0
  };

  createUser(user:User):Observable<User>{
    return this.httpClient.post<User>(this.url,user);
  
  }

  getByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/byEmail/${email}`);
  }


  changePoint(user : User): Observable<User>{
    const userUpdated: User = {
    id: user.id,
    firstName:user.firstName,
    lastName:user.lastName,
    age:user.age,
    email:user.email,
    points:(user.points ?? 0) + 5
  }
  console.log(userUpdated)
    return this.httpClient.put<User>(`${this.url}/${user.id}`, userUpdated)
  }

}

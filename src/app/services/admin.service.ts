import { LoginRequest } from './../model/login.model';
import { Structure } from './../model/structure.model';
import { Role } from './../model/role.model';
import { User } from './../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
const httpOptions={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  users: User[];
  structures: Structure[];
  public Roles: Role[];
  host: string ='http://localhost:9090';
apiURL: string ='http://localhost:9090/api';
private baseURL='http://localhost:9090/api/delete/';
private updateURL='http://localhost:9090/api/update/';
  constructor(private http : HttpClient) {
    this.users=[];
    this.Roles=[];
    this.structures=[];
   }
  listeUser():Observable<User[]>{
   return this.http.get<User[]>(this.apiURL +'/users'); 
  }
  listeRole():Observable<Role[]>{
   return this.http.get<Role[]>(this.apiURL +'/roles'); 
  }
  listeStructure():Observable<Structure[]>{
    return this.http.get<Structure[]>(this.apiURL +'/Structure'); 
   }
  Login(loginRequest:LoginRequest,):Observable<User>{

    return this.http.post<User>(this.apiURL +'/login',loginRequest,httpOptions); 
   }
  
  ajouterProduit(prod:User):Observable<User>{
    return this.http.post<User>(  this.apiURL +'/users', prod,httpOptions);
    }
  deleteAll():Observable<User[]>{
      
      return this.http.delete<User[]>(this.apiURL + '/delete', httpOptions );
  }
  updateUser(id_user:number, user:User):Observable<User>{
return this.http.put(this.updateURL+id_user, user);
  }
  /*updateUser( user:User):Observable<Object>{
    return this.http.put(this.updateURL, user);
      }*/
  delete(id_user:number):Observable<Object>{
     
 return this.http.delete(this.baseURL+id_user);
}
getUserById(id:number):Observable<User>{
  return this.http.get<User>(this.apiURL+'/users/'+id);}

  getRoleById(id:number):Observable<Role>{
    return this.http.get<Role>(this.apiURL+'/users/'+id);
}

   /* consulterProjet(id:number): User{
      return this.users.find(p => p.id == id);
    }*/
}

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
apiURL: string ='http://localhost:9090/api';
private baseURL='http://localhost:9090/api/delete/';
private updateURL='http://localhost:9090/api/update/';
  constructor(private http : HttpClient) {
    this.users=[];
   }
  listeProjet():Observable<User[]>{
   return this.http.get<User[]>(this.apiURL +'/users'); 
  }
  listeStructure():Observable<User[]>{
    return this.http.get<User[]>(this.apiURL +'/users'); 
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
     /* const url='${this.apiURL}/delete/${id}';
      return this.http.delete<User[]>(url , httpOptions );*/
 return this.http.delete(this.baseURL+id_user);
}
getUserById(id:number):Observable<User>{
  return this.http.get<User>(this.apiURL+'/users/'+id);

}

   /* consulterProjet(id:number): User{
      return this.users.find(p => p.id == id);
    }*/
}

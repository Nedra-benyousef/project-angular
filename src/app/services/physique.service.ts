import { Marche } from './../model/marche.model';
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
export class PhysiqueService {

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
  listeMarche():Observable<Marche[]>{
   return this.http.get<Marche[]>(this.apiURL +'/Marche'); 
  }
  
  
  
  ajouterMarche(prod:Marche):Observable<Marche>{
    return this.http.post<Marche>(  this.apiURL +'/Marche', prod,httpOptions);
    }
  deleteAll():Observable<User[]>{
      
      return this.http.delete<User[]>(this.apiURL + '/delete', httpOptions );
  }
  updateMarche(id_user:number, user:User):Observable<User>{
return this.http.put(this.updateURL+id_user, user);
  }
  /*updateUser( user:User):Observable<Object>{
    return this.http.put(this.updateURL, user);
      }*/
  deletemarche(id_user:number):Observable<Object>{
     
 return this.http.delete(this.baseURL+id_user);
}
getMarcheById(id:number):Observable<User>{
  return this.http.get<User>(this.apiURL+'/Marche/'+id);}

 

   /* consulterProjet(id:number): User{
      return this.users.find(p => p.id == id);
    }*/
}

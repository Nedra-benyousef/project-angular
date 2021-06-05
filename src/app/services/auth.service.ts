import { Router } from '@angular/router';
import { role } from './../model/role.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import{ HttpClient , HttpHeaders} from '@angular/common/http';

const httpOptions={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // public roles: role[] = [{"role":"admin"},{"role":"financier"}];
  public loggedUser: string ;
  public isloggedIn: Boolean = false;
  //public roles: string[];
  users: User[];
  apiURL: string ='http://localhost:9090/api/users';
   roles:role[];
  //public loggedUser:string;
    constructor(private http : HttpClient, private router:Router ) {
      this.users=[];
     this.roles=[];
      this.loggedUser='';
      
     }
     getUserFromDB(matricule:string):Observable<User>
     {
       const url =this.apiURL;
        return this.http.get<User>(url);
     }
     signIn(user:User){
      this.loggedUser = String(user.matricule);
     this.isloggedIn = true;
     this.roles=Object(user.roles);
     localStorage.setItem('loggedUser', this.loggedUser);
     localStorage.setItem('isloggedIn', String(this.isloggedIn));

   }

  ajouterProduit(prod:User):Observable<User>{
    return this.http.post<User>(  this.apiURL, prod,httpOptions);
    }
   
    
    /*authenticate(this.user,matricule, password) {
      if (matricule === "javainuse" && password === "password") {
        sessionStorage.setItem('username', username)
        return true;
      } else {
        return false;
      }
    }*/
  
    isUserLoggedIn() {
      let user = sessionStorage.getItem('username')
      console.log(!(user === null))
      return !(user === null)
    }
  /*SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if
        (user.username === curUser.username && user.password == curUser.password) {
        validUser = true;
       // this.loggedUser = curUser.username;
        this.isloggedIn = true;
        //this.roles = curUser.roles;
       // localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/
  isAdmin():Boolean{
    let admin:Boolean=false;
    if(!this.roles)
    return false;
   
    this.roles.forEach((curRole)=>{
      if(curRole.role=='administrateur'){
      admin=true;
    }
    });
    return admin;

}
logout(){
  /*this.isloggedIn=false;
  this.loggedUser=undefined;
  this.roles=undefined;
  localStorage*/
}
setLoggedUserFromLocalStorage(login:string){
  this.loggedUser=login;
  this.isloggedIn=true;
 // this.getUserRoles(login);
}
getUserRoles(matricule:string){
  this.users.forEach((curUser)=>{
    if(curUser.matricule==matricule)
    {//this.roles=curUser.roles;
    }
  });
}
}
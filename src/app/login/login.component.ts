import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { User } from './../model/user.model';
//import { User } from './../model/user.model';

import { Component, OnInit } from '@angular/core';
//import { NgForm } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user= new User();
  erreur=0;
  constructor(private authService: AuthService , private router:Router) {
    
   }

ngOnInit(): void {
  }
  onLoggedin(matricule:string)
{ //var x:String =this.user.matricule;
  this.authService.getUserFromDB(matricule  ).subscribe((user:User)=>
  {
    if(user.mdp==this.user.mdp)
    {
      this.authService.signIn(user);
      this.router.navigate(['/admin']);
    }
    else 
    this.erreur=1;},(err)=> console.log(err));

  }


  

}
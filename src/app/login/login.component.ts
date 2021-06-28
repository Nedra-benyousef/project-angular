import { Role_Status } from './../model/role_status.model';
import { Profile } from './../model/profile.model';
import { AdminService } from './../services/admin.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { User } from './../model/user.model';
//import { User } from './../model/user.model';

import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../model/login.model';
//import { NgForm } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user= new User();
  loginRequest= new LoginRequest();
  erreur=0;
  constructor(private authService: AuthService ,private adminService: AdminService , private router:Router) {
    
   }

ngOnInit(): void {

  }

  onLoggedin()
{ console.log("hello");
  this.adminService.Login(this.loginRequest).subscribe(
    (data)=>{this.user=data
      localStorage.setItem("user",JSON.stringify(this.user))
this.user.profiles?.forEach(
  (profile)=>{
    if(profile.role!.name===Role_Status.Administrateur)
    {
      this.router.navigate(["/admin"]);
    }
    else if(profile.role!.name===Role_Status.Chef_de_projet)
    {
      this.router.navigate(["/projets"]);
    }
    else if(profile.role!.name===Role_Status.Responsable_de_marche)
    {
      this.router.navigate(["/marche"]);
    }
    else if(profile.role!.name===Role_Status.Responsable_Technique)
    {
      this.router.navigate(["/Physique"]);
    }
  }
)
    }
  );



}


  

}
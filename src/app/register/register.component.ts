import { role } from './../model/role.model';
import { AdminService } from './../services/admin.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser =new  User();
  //roles = new role();
  roles : role[];
  constructor(private adminService : AdminService
              ,private router:Router 
              ) { this.roles= [];
                 }
  
  ngOnInit(): void {
  }
  addUser(){
    this.adminService.ajouterProduit(this.newUser).subscribe(prod =>
    {console.log(prod);});
    this.router.navigate(['projets']);
    }

}

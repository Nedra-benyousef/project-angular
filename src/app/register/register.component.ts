import { Structure } from './../model/structure.model';
import { StructureService } from './../services/structure.service';
import { Projet } from './../model/projet.model';
import { ProjetService } from './../services/projet.service';
import { RoleService } from './../services/role.service';
import { Role } from './../model/role.model';
import { AdminService } from './../services/admin.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser = new User();
  //roles = new role();
  roles: Role[]= [];
  projets: Projet[]=[];
  Structures: Structure[]=[];
  loggedinUser= new User();
  constructor(private adminService: AdminService,private StructureService:StructureService
    , private router: Router,
    private roleService: RoleService,
    private profileService: ProfileService,
    private projetService: ProjetService
  ) {
  
  }

  ngOnInit(): void {
     
    const userString=localStorage.getItem("user");
    if(userString){
      this.loggedinUser= JSON.parse(userString)
    
  }
  else{
    this.router.navigate(["/login"]);
  }  
    this.projetService.listeProjet().subscribe(
      (data) => {
        this.projets=data
      }
    )
    this.roleService.listeRole().subscribe(
      (data) => this.roles = data
    )
    this.StructureService.listeStructure().subscribe(
      (data) => {
        this.projets=data
      }
    )
    this.StructureService.listeStructure().subscribe(
      (data) => this.Structures = data
    )
  }
  deconnexion(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
  addUser() {
    this.adminService.ajouterProduit(this.newUser).subscribe(prod => { console.log(prod); });
    this.router.navigate(['admin']);
  }

}

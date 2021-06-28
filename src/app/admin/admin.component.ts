import { Profile } from './../model/profile.model';
import { RoleService } from './../services/role.service';
import { ProjetService } from './../services/projet.service';
import { Projet } from './../model/projet.model';
import { StructureService } from './../services/structure.service';
import { Structure } from './../model/structure.model';
import { Role } from './../model/role.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { User } from './../model/user.model';
import {  OnInit } from '@angular/core';
import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
currentUser= null ;
  users : User[];
  projets: Projet[]=[];
  Structure: Structure[]=[];
  roles: Role[]=[];
  profiles: Profile[]=[];
  nom: any;
  newUser = new User();
  profile = new Profile();
  loggedinUser= new User();
  
 // structures:Structure[];
  constructor(private roleService :RoleService ,  private profileService : ProfileService, private StructureService: StructureService , private adminService :AdminService,private router:Router,private activateRoute : ActivatedRoute ) { 
    this.users= [];

   // this.structures=[];
    //this.projets=[{idproduit:1,nomproduit:"PCAsus",
  //prixproduit:3000.600,datecreation:new Date("01/14/2011")}];
}

  ngOnInit(): void {
    const userString=localStorage.getItem("user");
    if(userString){
      this.loggedinUser= JSON.parse(userString)
    
  }
  else{
    this.router.navigate(["/login"]);
  }
    this.profileService.listeProfile().subscribe(
      (data) => {
        this.profiles=data
      }
    )
    this.roleService.listeRole().subscribe(
      (data) => this.roles = data
    )
    this.getUser();
    this.getRole();
    this.StructureService.listeStructure().subscribe(
      (data) => {
        this.projets=data
      }
    )
    this.StructureService.listeStructure().subscribe(
      (data) => this.Structure = data
    )
    
  }
private getUser(){
  this.adminService.listeUser().subscribe((prods =>
    { //console.log('Item:'+JSON.stringify(this.roles));
      this.users = prods;

    }));
}
deconnexion(){
  localStorage.removeItem("user");
  this.router.navigate(["/login"]);
}
private getRole(){
  this.adminService.listeStructure().subscribe((prods =>
    { //console.log('Item:'+JSON.stringify(this.roles));
      //this.structers = prods;

    }));
}
supprimerUser(id_user:number){
  let conf = confirm("Etes-vous sur de confirmer la suppresion de projet ?");
if(conf)
  this.adminService.delete(id_user).subscribe(data =>
    {
      console.log(data);
      this.getUser();
    })
}
userDetail(id_user:number){
  this.router.navigate(['detail',id_user]);

}


/*this.router.navigate(['']).then(() =>{
  window.location.reload();
})*/



/*supprimerUser(id:number)
{let conf = confirm("Etes-vous sur ?");
if(conf)
  this.adminService.delete(id).subscribe(data =>
  {
  console.log(data);
  //this.toastr.warning('data deleted');
  },
  error => console.log(error));
}*/

updateUser(id_user:number){
  this.router.navigate(['update',id_user]);
}

/*updateUser(){
  this.adminService.updateUser(this.currentUser).subscribe(()=>{
    this.router.navigate(['update']);
  }, (error)=>{alert("erreur")})
}*/

/*SuprimerProduitDuTableau(prod:User){
  this.users.forEach((cur, index) => {
    if(prod.matricule===cur.matricule){
      this.users.splice(index, 1);
    }
  });
}*/
Search(){
  if(this.nom ==""){
    this.ngOnInit();
  }else {
    this.users= this.users.filter(res =>{
      return res.nom?.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
    })
  }
}

 searchEmployees(key: string): void {
  console.log(key);
  const results: User[] = [];
  for (const user of this.users) {
    if (user.matricule?.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.nom?.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.prenom?.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.email?.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(user);
    }
  }
  this.users = results;
  if (results.length === 0 || !key) {
    this.getUser();
  }
}
}
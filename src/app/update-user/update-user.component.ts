import { StructureService } from './../services/structure.service';
import { Structure } from './../model/structure.model';
import { RoleService } from '../services/role.service';
import { Role } from '../model/role.model';
import { Profile } from '../model/profile.model';
import { AdminService } from '../services/admin.service';
import { User } from '../model/user.model';
import { ProjetService } from '../services/projet.service';
import { Projet } from '../model/projet.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styles: [
  ]
})
export class UpdateUserComponent implements OnInit {
  id_user?: number;
  projet?: Projet;
  role?: Role;
  newUser: User = new User();
  projets: Projet[] = [];
  profile = new Profile();
  roles: Role[] = [];
  profiles: Profile[] = [];
  structures: Structure[] = [];
  loggedinUser=new User();
  //users : User[];
  // currentProjet = new Projet();
  constructor(
    private profileService: ProfileService, 
    private adminService: AdminService, 
    private projetService: ProjetService, 
    private roleService: RoleService,
    private structureService: StructureService,
    private route: ActivatedRoute,
    private router: Router) { //this.users= [];

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
        this.projets = data
      }
    )
    this.roleService.listeRole().subscribe(
      (data) => {
        this.roles = data
      }
    )

    this.structureService.listeStructure().subscribe(
      (data)=>{this.structures = data}
    )
    this.id_user = this.route.snapshot.params['id_user'];
    this.profileService.listeProfilesByUser(this.id_user!).subscribe(
      (data) => {this.profiles = data}
    )
    this.newUser = new User();
    this.adminService.getUserById(this.id_user || 0).subscribe(data => {
      //console.log(data)
      this.newUser = data;
    }, error => console.log(error));
    // this.getUser();
  }
  private getUser() {
    this.adminService.listeUser().subscribe((prods => { //console.log('Item:'+JSON.stringify(this.roles));
      // this.users = prods;

    }));
  }
  selectStructure(structure1:Structure,structure2:Structure){
    console.log("struture1.name_structure"+structure1.name_structure);
return structure1.name_structure===this.newUser.structure!.name_structure;
  }
  deleteProfile(profileToDelete:Profile){
    this.profileService.deleteProfile(profileToDelete).subscribe(
      (data)=>{
        console.log("Profile was deleted")
        this.profiles = this.profiles.filter(
          p => profileToDelete.profileId !== p.profileId
        )
      }
    )
  }
  updateUser() {
    let conf = confirm("Etes-vous sur de confirmer la modification ?");
    let profile = new Profile();
    profile.role=this.role;
    profile.projet=this.projet;
    profile.user= this.newUser;
    console.log("newUser:"+JSON.stringify(this.newUser));
    if (conf){
      this.profileService.createProfile(profile).subscribe(
        (profile)=>{
          this.newUser.profiles!.push(profile);
          this.adminService.updateUser(this.id_user || 0, this.newUser).subscribe(data => {
            this.Gotolist();
          }, error => console.log(error)
          );
        }
      )
      
    }
      

  }
  /*  public updateUser( user:User):void{
      let conf = confirm("Etes-vous sur ?");
    if(conf)
      this.adminService.updateUser(user).subscribe(
        (response:User)=>
        {console.log(response);
          this.getUser();},
          
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
        }
        );
    }*/
  /*this.id=this.route.snapshot.params['id'];
  this.adminService.getUserById(this.id ||0).subscribe(data =>
    {
      this.newUser=data;
    }, error => console.log(error));*/


  /*onSubmit(){
    this.adminService.updateUser(this.id||0,this.newUser).subscribe(data =>
      {this.Gotouserlist();

      }
     , error =>console.log(error));
  }*/
  /* updateUser(id:number){
     this.router.navigate(['update',id]);
   }*/
  /* updateUser(){
     this.adminService.updateUser(this.id_user||0,this.newUser).subscribe(data=>{
       console.log(data);
       this.newUser=new User();
       this.Gotolist();
       this.router.navigate(['update']);
     },error=>console.log("erreur de modification"));
   }*/
  Gotolist() {
    this.router.navigate(['/admin']);
  }
}

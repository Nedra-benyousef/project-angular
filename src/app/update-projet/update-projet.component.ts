import { AdminService } from './../services/admin.service';
import { User } from './../model/user.model';
import { ProjetService } from './../services/projet.service';
import { Projet } from './../model/projet.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styles: [
  ]
})
export class UpdateProjetComponent implements OnInit {
 id_user?:number;
  newUser:User =new  User();
  //users : User[];
 // currentProjet = new Projet();
  constructor(private adminService :AdminService,
    private route:ActivatedRoute, 
    private router: Router) 
              { //this.users= [];
                
              }


  ngOnInit(): void {
    this.id_user = this.route.snapshot.params['id_user'];

       this.newUser=new User();
        this.adminService.getUserById(this.id_user||0).subscribe(data =>
          {
            //console.log(data)
            this.newUser=data;
          },error =>console.log(error));
         // this.getUser();
      }
      private getUser(){
        this.adminService.listeProjet().subscribe((prods =>
          { //console.log('Item:'+JSON.stringify(this.roles));
           // this.users = prods;
      
          }));
      }
      updateUser(id_user:number, user:User){
        let conf = confirm("Etes-vous sur ?");
      if(conf)
        this.adminService.updateUser(this.id_user||0,this.newUser).subscribe(data =>
          {
            
            this.Gotolist();
          },error=>console.log(error)
          );
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
Gotolist(){
  this.router.navigate(['/admin']);
}
}

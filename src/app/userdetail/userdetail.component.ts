import { Profile } from './../model/profile.model';
import { ProfileService } from './../services/profile.service';
import { User } from './../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
id_user?:number;
user:User=new User;
users : User[];
profiles: Profile[] = [];
loggedinUser= new User();
  constructor( private router: Router, private route: ActivatedRoute, private adminService:AdminService, private profileService:ProfileService) {
    this.users= [];
   }

  ngOnInit(): void {
    
    const userString=localStorage.getItem("user");
    if(userString){
      this.loggedinUser= JSON.parse(userString)
    
  }
  else{
    this.router.navigate(["/login"]);
  }
    this.id_user = this.route.snapshot.params['id'];
    this.profileService.listeProfilesByUser(this.id_user!).subscribe(
      (data)=>{
        this.profiles = data
      }
    )
    this.user = new User();
    this.adminService.getUserById(this.id_user||0).subscribe( data => {
      this.user = data;
    });
  }
  deconnexion(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
  private getUser(){
    this.adminService.listeUser().subscribe((prods =>
      { //console.log('Item:'+JSON.stringify(this.roles));
        this.users = prods;
  
      }));
  }
  
  supprimerUser(id_user:number){
    let conf = confirm("Etes-vous sur ?");
  if(conf)
    this.adminService.delete(id_user).subscribe(data =>
      {
        console.log(data);
        this.getUser();
      })
  }
}

import { User } from './../model/user.model';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private adminService:AdminService) {
    this.users= [];
   }

  ngOnInit(): void {
    this.id_user = this.route.snapshot.params['id'];

    this.user = new User();
    this.adminService.getUserById(this.id_user||0).subscribe( data => {
      this.user = data;
    });
  }
  private getUser(){
    this.adminService.listeProjet().subscribe((prods =>
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

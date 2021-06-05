import { role } from './../model/role.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { User } from './../model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
currentUser= null ;
  users : User[];
  nom: any;
  roles : role[];
  constructor(private adminService :AdminService,private router:Router,private activateRoute : ActivatedRoute ) { 
    this.users= [];
    this.roles=[];
    //this.projets=[{idproduit:1,nomproduit:"PCAsus",
  //prixproduit:3000.600,datecreation:new Date("01/14/2011")}];
}

  ngOnInit(): void {
    this.getUser();
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
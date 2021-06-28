import { User } from './../model/user.model';
import { StructureService } from './../services/structure.service';
import { Structure } from './../model/structure.model';
import { ProjetsComponent } from './../projets/projets.component';
import { Router } from '@angular/router';
import { ProjetService } from './../services/projet.service';
import { Projet } from './../model/projet.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.css']
})
export class AddProjetComponent implements OnInit {
  //myDate= Date.now();
  newProjet = new Projet();
  Structure: Structure[]=[];
  projets: Projet[]=[];
  loggedinUser= new User();
  constructor(private ProjetService: ProjetService, private StructureService:StructureService
    , private router: Router
  ) {
  }

  ngOnInit(): void {
    this.StructureService.listeStructure().subscribe(
      (data) => this.Structure = data
    )
  
    const userString=localStorage.getItem("user");
    if(userString){
      this.loggedinUser= JSON.parse(userString)
    
  }
  else{
    this.router.navigate(["/login"]);
  }
  }
  addProjet() {
    this.ProjetService.ajouterProjet(this.newProjet).subscribe(prod => { console.log(prod); });
    this.router.navigate(['projets']);
  }

}

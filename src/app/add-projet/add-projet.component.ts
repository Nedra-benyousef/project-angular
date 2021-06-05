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
  myDate= Date.now();
 newProjet =new  Projet();
  
  constructor(private ProjetService : ProjetService
              ,private router:Router 
              ) { 
                 }
  
  ngOnInit(): void {
  }
  addProjet(){
    this.ProjetService.ajouterProjet(this.newProjet).subscribe(prod =>
    {console.log(prod);});
    this.router.navigate(['projets']);
    }
}

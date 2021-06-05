import { ProjetService } from './../services/projet.service';
import { Projet } from './../model/projet.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AddProjetComponent } from './../add-projet/add-projet.component';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  myDate= Date.now();
  projets : Projet[];
  constructor(private projetService :ProjetService,private router:Router ) { 
    this.projets= [];
    //this.projets=[{idproduit:1,nomproduit:"PCAsus",
  //prixproduit:3000.600,datecreation:new Date("01/14/2011")}];
}

  ngOnInit(): void {
    this.projetService.listeProjet().subscribe(prods =>
      { console.log(prods);
        this.projets = prods;
      })
  }
  supprimerProjet(p:Projet)
  {let conf = confirm("Etes-vous sur ?");
if(conf)
this.projetService.supprimerProjet(p.id||0).subscribe(()=>
{
  console.log("projet supprimé");
});
this.router.navigate(['produits']).then(()=>{
  window.location.reload();
})




}

}

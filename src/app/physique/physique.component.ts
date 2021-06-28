import { EtatProjet } from './../model/EtatProjet';
import { User } from './../model/user.model';
import { Projet } from './../model/projet.model';
import { ProjetService } from './../services/projet.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-physique',
  templateUrl: './physique.component.html',
  styleUrls: ['./physique.component.css']
})
export class PhysiqueComponent implements OnInit {
  projets: Projet[];
  closeResult = '';
  newProjet = new Projet();
  loggedinUser = new User();
  id?: number;
  progress = "100"
  planificationProjets: Projet[] = []
  ajustementProjets: Projet[] = []
  realisationProjets: Projet[] = []
  @ViewChild('contentPlanification', { static: false })
  contentPlanification: any;
  @ViewChild('contentAjutement', { static: false })
  contentAjustement: any;
  @ViewChild('contentRealisation', { static: false })
  contentRealisation: any;
  constructor(private route: ActivatedRoute, private modalService: NgbModal,
    private projetService: ProjetService, private router: Router,
    private activateRoute: ActivatedRoute) { this.projets = []; }

  ngOnInit(): void {
    const userString = localStorage.getItem("user");
    if (userString) {
      this.loggedinUser = JSON.parse(userString)
    }
    else {
      this.router.navigate(["/login"]);
    }
    this.id = this.route.snapshot.params['id'];
    this.getProjet();
    this.projetService.listeProjet().subscribe(
      (data) => {
        this.projets = data
        this.planificationProjets = this.projets.filter(m => m.etat === EtatProjet.PLANIFICATION)
        this.ajustementProjets = this.projets.filter(m => m.etat === EtatProjet.AJUSTEMENT)
        this.realisationProjets = this.projets.filter(m => m.etat === EtatProjet.REALISATION)
      })
  }
  private getProjet() {
    this.projetService.listeProjet().subscribe((prods => { //console.log('Item:'+JSON.stringify(this.roles));
      this.projets = prods;

    }));
  }
  deconnexion() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
  addProjet() {
    this.projetService.ajouterProjet(this.newProjet).subscribe(prod => { console.log(prod); });
    this.router.navigate(['physique']);
  }
  addProgress(event: any, projetref: string) {
    console.log("event.target" + event.target)
    console.log("projetref" + projetref)
    const projet = this.projets.filter(
      (projet) => {
        return projet.ref === projetref;

      }
    )
    if (projet[0].engagement)
      projet[0].engagement! += 5;
    else {
      projet[0].engagement = 5;
    } if (projet[0].engagement > 100) {
      projet[0].engagement = 100
    }
    this.newProjet = projet[0];    
  }
  decreaseProgress(event: any, projetref: string) {
    console.log("event.target" + event.target)
    console.log("projetref" + projetref)
    const projet = this.projets.filter(
      (projet) => {
        return projet.ref === projetref;

      }
    )
    if (projet[0].engagement)
      projet[0].engagement! -= 5;
    else {
      projet[0].engagement = 0;
    }
    if (projet[0].engagement < 0) {
      projet[0].engagement = 0
    }
    this.newProjet = projet[0];
    
  }

  /*supprimerProjet(p:Projet)
  {let conf = confirm("Etes-vous sur ?");
if(conf)
this.projetService.deleteProjet(p.id||0).subscribe(()=>
{
  console.log("projet supprimé");
});
this.router.navigate(['produits']).then(()=>{
  window.location.reload();
})}*/
  supprimerProjet(id: number) {
    let conf = confirm("Etes-vous sur de confirmer la suppresion de projet ?");
    if (conf)
      this.projetService.deleteProjet(id).subscribe(data => {
        console.log(data);
        this.getProjet();
      })
  }
  projetDetail(id: number) {
    this.router.navigate(['dashboard', id]);

  }
  loadProjet(ref:any){
    console.log(ref.target.value)
    const projetsList = this.projets 
    this.newProjet = this.projets.filter(
      p => p.ref == ref.target.value
    )[0]
    this.projets = projetsList
  }
  //
  /*updateProjet(id:number){
    //this.router.navigate(['update',id]);
  }*/
  updateProjetPlanification() {

    // let conf = confirm("Etes-vous sur de confirmer la modification ?");
    // if (conf)
    this.newProjet.etat = EtatProjet.PLANIFICATION
    this.planificationProjets.push(this.newProjet)
    this.updatePorjet()
  }
  updateProjetAjustement(){
    this.newProjet.etat = EtatProjet.AJUSTEMENT
    this.ajustementProjets.push(this.newProjet)
    this.updatePorjet()
  }
  updateProjetRealisation(){
    this.newProjet.etat = EtatProjet.REALISATION
    this.realisationProjets.push(this.newProjet)
    this.updatePorjet()
  }
  updatePorjet(){
    this.projetService.updateProjet(this.newProjet).subscribe(data => {
      console.log("project was updated")
      console.log(JSON.stringify(data))

    }, error => console.log(error)
    );
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

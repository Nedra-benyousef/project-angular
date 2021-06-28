import { StructureService } from './../services/structure.service';
import { Structure } from './../model/structure.model';
import { User } from './../model/user.model';
import { ProjetService } from './../services/projet.service';
import { Projet } from './../model/projet.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddProjetComponent } from './../add-projet/add-projet.component';



@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  myDate = Date.now();
  projets: Projet[];
  modalClasses = "modal-dialog modal-xl";
  closeResult = '';
  newProjet = new Projet();
  structures: Structure[] = []
  id?: number;
  @ViewChild('contentUpdate', { static: false })
  contentUpdate: any;
  loggedinUser= new User();
  constructor(private route: ActivatedRoute, private modalService: NgbModal, private projetService: ProjetService, private router: Router, private activateRoute: ActivatedRoute,private structureService :StructureService) {
    this.projets = [];
    //this.projets=[{idproduit:1,nomproduit:"PCAsus",
    //prixproduit:3000.600,datecreation:new Date("01/14/2011")}];
  }

  ngOnInit(): void {
    this.structureService.listeStructure().subscribe(
      (data)=>{this.structures = data}
    )
    const userString=localStorage.getItem("user");
    if(userString){
      this.loggedinUser= JSON.parse(userString)
    
  }
  else{
    this.router.navigate(["/login"]);
  } 
    this.id = this.route.snapshot.params['id'];

    /*this.newProjet = new Projet();
    this.projetService.getProjetById(this.id || 0).subscribe(data => {
      //console.log(data)
      this.newProjet = data;
    }, error => console.log(error));*/
    // this.getUser();
    this.getProjet();
  }
  private getProjet() {
    this.projetService.listeProjet().subscribe((prods => { //console.log('Item:'+JSON.stringify(this.roles));
      this.projets = prods;

    }));
  }
  deconnexion(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
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
  //
  /*updateProjet(id:number){
    //this.router.navigate(['update',id]);
  }*/
  updateProjet() {

    let conf = confirm("Etes-vous sur de confirmer la modification ?");
    if (conf)
      this.projetService.updateProjet(this.newProjet).subscribe(data => {
        console.log("project was updated")
        console.log(JSON.stringify(data))

      }, error => console.log(error)
      );
  }

  handleUpdate(projet:Projet){
    console.log(JSON.stringify(projet));
    this.newProjet = projet
    this.open(this.contentUpdate);
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl', backdrop: 'static' }).result.then((result) => {
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

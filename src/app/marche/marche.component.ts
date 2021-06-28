import { User } from './../model/user.model';
import { Statut } from './../model/statut.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Marche } from './../model/marche.model';
import { Router } from '@angular/router';
import { MarcheService } from './../services/marche.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styles: [
  ]
})

export class MarcheComponent implements OnInit {

  newMarche = new Marche();
  marches: Marche[] = [];
  planPassation: Marche[] = [];
  planConsignation: Marche[] = [];
  planPublication: Marche[] = [];
  statutPassation = [Statut.creer];
  statutConsignation = [Statut.encours, Statut.suspendue, Statut.archivé];
  statutPublication = [Statut.encours, Statut.suspendue, Statut.cloturé, Statut.archivé];

  @ViewChild('content1', { static: false })
  content1: any;
  @ViewChild('content2', { static: false })
  content2: any;
  @ViewChild('content3', { static: false })
  content3: any;
  closeResult = '';
  years: string[] = [];
  loggedinUser= new User();
  statuts: string[] = Object.keys(Statut);
  constructor(private marcheService: MarcheService
    , private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    const userString=localStorage.getItem("user");
    if(userString){
      this.loggedinUser= JSON.parse(userString)
    
  }
  else{
    this.router.navigate(["/login"]);
  }
    for (var i: number = 1990; i < 2099; i++) {
      this.years.push(i + "")
    }
    this.marcheService.listeMarche().subscribe(
      (data) => {
        this.marches = data
        this.planPassation = this.marches.filter(m => this.statutPassation.includes(m.etat!))
        this.planConsignation = this.marches.filter(m => this.statutConsignation.includes(m.etat!))
        this.planPublication = this.marches.filter(m => this.statutPublication.includes(m.etat!))
      }
    );
    this.getMarche();
   
  }
  private getMarche() {
    this.marcheService.listeMarche().subscribe((prods => { //console.log('Item:'+JSON.stringify(this.roles));
      this.marches = prods;

    }));
  }
  loadMarche(newValue: any) {

    const marche = this.planPassation.filter(
      (marche) => {
        console.log("marche.refMarche" + marche.refMarche);
        return marche.refMarche === newValue.target.value

      }

    )

    console.log("newValue" + newValue);
    console.log("marche[0]" + marche[0]);
    this.newMarche = marche[0];
  }

  loadMarche2(newValue: any) {

    const marche = this.planConsignation.filter(
      (marche) => {
        console.log("marche.refMarche2" + marche.refMarche);
        return marche.refMarche === newValue

      }

    )

    console.log("newValue2" + newValue);
    console.log("marche[0]2" + marche[0]);
    this.newMarche = marche[0];
  }
  deconnexion(){
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
  addMarche() {
    this.marcheService.ajouterMarche(this.newMarche).subscribe(prod => { console.log(prod); });
    this.router.navigate(['marche']);
  }
  supprimerMarche(id: number) {
    let conf = confirm("Etes-vous sur de confirmer la suppresion de projet ?");
    if (conf)
      this.marcheService.deletemarche(id).subscribe(data => {
        console.log(data);
        this.getMarche();
      })
  }
  updateMarche() {
    console.log(this.newMarche);
    let conf = confirm("Etes-vous sur de confirmer la modification ?");
    if (conf)
      this.marcheService.updateMarche(this.newMarche).subscribe(data => {
        console.log("marche was updated")
        console.log(JSON.stringify(data))

      }, error => console.log(error)
      );
  }
  handleUpdate1(marche: Marche) {
    console.log(JSON.stringify(marche));
    this.newMarche = marche
    this.open(this.content1);

  }
  handleUpdate2(marche: Marche) {
    console.log(JSON.stringify(marche));
    this.newMarche = marche
    this.open(this.content2);

  }
  handleUpdate3(marche: Marche) {
    console.log(JSON.stringify(marche));
    this.newMarche = marche
    this.open(this.content3);

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

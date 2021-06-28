import { ProjetService } from './../services/projet.service';
import { Projet } from './../model/projet.model';
import { AdminService } from './../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id?:number;
  projet:Projet=new Projet;
  projets : Projet[];
  constructor(private route: ActivatedRoute, private projetService:ProjetService) {
    this.projets= [];
   } 

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.projet = new Projet();
    this.projetService.getProjetById(this.id||0).subscribe( data => {
      this.projet = data;
    });
  
  }}
import { ProjetsComponent } from './../projets/projets.component';
import { Projet } from './../model/projet.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  projets: Projet[];
  apiURL: string = 'http://localhost:9090/api/Projet';
  constructor(private http: HttpClient) {
    this.projets = [];
  }
  listeProjet(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiURL);
  }
  ajouterProjet(prod: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiURL, prod, httpOptions);
  }

  /* supprimerProjet(id:number){
     const url='${this.apiURL}/${id}';
     return this.http.delete(url,httpOptions);
   }*/
  deleteProjet(id: number): Observable<Object> {

    return this.http.delete(this.apiURL +"/deleteProjet/"+ id);
  }
  updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put(this.apiURL, projet);
  }
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(this.apiURL +"/"+ id);

  }


}

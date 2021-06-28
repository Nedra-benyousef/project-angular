import { Structure } from './../model/structure.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class StructureService {
  Structure: Structure[];
  apiURL: string = 'http://localhost:9090/api/Structure';
  constructor(private http: HttpClient) {
    this.Structure = [];
  }
  listeStructure(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.apiURL);
  }


}

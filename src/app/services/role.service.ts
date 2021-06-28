import { Role } from './../model/role.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: Role[];
  apiURL: string = 'http://localhost:9090/api/roles';
  constructor(private http: HttpClient) {
    this.roles = [];
  }
  listeRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiURL);
  }


}

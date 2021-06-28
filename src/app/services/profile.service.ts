import { User } from './../model/user.model';
import { Profile } from './../model/profile.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  profiles: Profile[];
  apiURL: string = 'http://localhost:9090/api/Profile';
  constructor(private http: HttpClient) {
    this.profiles = [];
  }
  listeProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiURL);
  }

  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiURL,profile);
  }

  deleteProfile(profile: Profile):Observable<Profile> {
    return this.http.delete<Profile>(this.apiURL+"/"+profile.profileId);
  }

  listeProfilesByUser(idUser: number): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiURL+"/byUser/"+idUser);
  }

}

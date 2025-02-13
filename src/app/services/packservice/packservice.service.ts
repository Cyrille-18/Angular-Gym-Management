import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackserviceService {
  private baseapiUrl = 'http://localhost:8080/packs';

  constructor(private http: HttpClient) {
    this.getPacks();
  }

  // recupère tout les packs
  getPacks(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur connecté
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseapiUrl}/getall`, { headers });
  }

  // mettre à jour un pack
  updatePack(id: number, packData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(`${this.baseapiUrl}/update/${id}`, packData, {
      headers,
    });
  }

  //  ajoute un pack
  addPack(packData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.baseapiUrl}/add`, packData, { headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'ajout d'une offre:", error);
          return throwError(error); // Renvoyer l'erreur pour gestion dans le composant
        })
      );
  }

  // supprime un pack
  deletePack(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete(`${this.baseapiUrl}/delete/${id}`, {
        headers,
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de la suppression de l'offre:", error);
          return throwError(error); // Renvoyer l'erreur pour la gestion dans le composant
        })
      );
  }
}

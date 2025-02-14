import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private baseapiUrl = 'http://localhost:8080/subscriptions';

  constructor(private http: HttpClient) {}

  // recupère toutes les souscriptions
  getSubscriptions(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur connecté
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseapiUrl}/getall`, { headers });
  }

  // ajoute une souscription
  addSubscription(subscriptionData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.baseapiUrl}/add`, subscriptionData, { headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'inscription:", error);
          return throwError(error);
        })
      );
  }
}

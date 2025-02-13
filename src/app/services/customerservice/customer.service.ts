import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseapiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    this.getCustomers();
  }

  getCustomers(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur connecté
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseapiUrl}/users/customers`, { headers });
  }

  // mettre à jour les infos d'un client
  updateCustomer(id: number, customerData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.baseapiUrl}/users/customers/update/${id}`, customerData, { headers });
  }

  // suppresion d'un client par son id
  deleteCustomer(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.delete(`${this.baseapiUrl}/users/customers/delete/${id}`, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la suppression du client:', error);
          return throwError(error); // Renvoyer l'erreur pour la gestion dans le composant
        })
      );
  }

  // Ajouter un client

  addCustomer(customerData: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(`${this.baseapiUrl}/auth/register/customer`, customerData, { headers })
    .pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'ajout du client:', error);
        return throwError(error); // Renvoyer l'erreur pour gestion dans le composant
      })
    );
}
}

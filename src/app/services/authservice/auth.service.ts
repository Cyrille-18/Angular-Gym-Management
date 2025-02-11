import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private role: string[] = [];
  private usernameSubject = new BehaviorSubject<string | null>(null);
  
  constructor(private http: HttpClient) {
    this.decodeToken();
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>('http://localhost:8080/auth/login', { username, password });
  }

  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
      this.decodeToken();
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  decodeToken() {
    if (typeof window === 'undefined') return; // Empêche l'exécution côté serveur

    const token = this.getToken();
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      this.role = decoded.role || [];
      this.usernameSubject.next(decoded.sub || decoded.username || '');
    } else {
      this.usernameSubject.next(null);
    }
    console.log('Rôles de l\'utilisateur:', this.role);
  }

  getUserRoles(): string[] {
    return this.role;
  }

  getUsernameObservable() {
    return this.usernameSubject.asObservable();
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    this.role = [];
    this.usernameSubject.next(null);
  }
}

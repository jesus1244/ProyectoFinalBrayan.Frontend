import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HealthData, login, response_obtener_prediccion, user } from '../Interfaces/user.interface';
import { Observable } from 'rxjs';

import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PagesServiceService {

  private apiUrl: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  login(user: login): Observable<login>{

    const url = `${ this.apiUrl }/auth/login`;

    return this.http.post<login>( url, user );
  }

  register(user: user): Observable<user>{

    const url = `${ this.apiUrl }/auth/register`;

    return this.http.post<user>( url, user );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  predict(data: HealthData): Observable<HealthData>{

    const url = `${ this.apiUrl }/predict`;
    const options = {
      headers: {
        'APIKEY': 'db92efc69991',
        'PROYECTNAME': 'demo'
      }
    };
    return this.http.post<HealthData>( url, data, options );
  }

  obtener_prediccion(transactionId: string): Observable<response_obtener_prediccion>{

    const url = `${ this.apiUrl }/obtener_prediccion/${ transactionId }`;
    const options = {
      headers: {
        'APIKEY': 'db92efc69991',
        'PROYECTNAME': 'demo'
      }
    };
    return this.http.get<response_obtener_prediccion>( url, options );
  }

  decodeToken(token: string): any | null {
    try {
      // Decodificar el token
      const decoded = jwtDecode(token);
  
      // El contenido decodificado del token estará en decodedToken
      return decoded;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    // Verifica si hay un token en el localStorage
    return !!this.getToken();
  }
}

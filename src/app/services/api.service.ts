import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode }from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { CanActivateFn, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

interface LoginResponse {
  message: string,
  token: string;
}

interface JwtPayload {
  role: string,
  exp: any
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  // private apiUrl = 'http://localhost:3000/api';
  private apiUrl = `${environment.apiUrl}`;

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient, private router: Router) { }

  // Authentication Endpoints
  register(user: { fullName: string, email: string, username: string, password: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user).pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  login(credentials: { username: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      }),
      catchError(this.handleError<LoginResponse>('login'))
    );
  }

  // Role Management Endpoints
  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('getRoles'))
    );
  }

  createRole(role: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles`, role, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('createRole'))
    );
  }

  // Protected Endpoints
  getAdminContent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/admin-endpoint`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('getAdminContent'))
    );
  }

  // Admin Functions
  verifyServiceProvider(id: number, verified: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/verify/${id}`, { verified }, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('verifyServiceProvider'))
    );
  }

  addSubscription(providerId: number, subscriptionType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/subscriptions`, { providerId, subscriptionType }, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('addSubscription'))
    );
  }

  trackPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/payments`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('trackPayments'))
    );
  }

    isLoggedIn(): boolean {
      const token = localStorage.getItem('token');
      return !!token;
    }

   
  logout(): void {
    localStorage.removeItem('token');
  
    const currentUrl = this.router.url; // Get the current URL
    this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
  } 

  getRole(): any {
    try {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload & { role: string };
      return decodedToken.role || null; 
    } 
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }

  }


    // Check if the user is authenticated
    isAuthenticated(): Observable<boolean> {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
  
      // If there is no token, the user is not authenticated
      if (!token) {
        return of(false);
      }
  
      // try {
        // Decode the token to get its payload
        // const tokenPayload = jwtDecode(token) as JwtPayload & { exp: any }
  
        return of(token).pipe(
          map((token) => {
            const tokenPayload = jwtDecode(token) as JwtPayload;
            const now = Math.floor(Date.now() / 1000);
            return tokenPayload.exp > now;
          }),
          catchError((error) => {
            console.error('Error decoding token:', error);
            this.logout();
            return of(false);
          })
        );
      // }
    }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

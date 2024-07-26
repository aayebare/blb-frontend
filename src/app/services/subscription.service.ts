import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Subscription {
    contractorId: number; 
    planName: string; 
    price: number;
    duration: string; 
    startDate: Date;
    endDate: Date;
  }

@Injectable({
  providedIn: 'root',
})


export class SubscriptionService {
    private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any[]>('getAllSubscriptions', []))
    );
  }

  getSubscriptionsByContractor(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>(`getSubscriptionsByContractor id=${id}`))
    );
  }


  addSubscription(subscription: any): Observable<any> {
    console.log(subscription, '828228228828282')
    return this.http.post<any>(`${this.apiUrl}/create`, subscription, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('addContractor'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
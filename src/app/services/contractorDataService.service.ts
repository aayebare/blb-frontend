import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractorDataService {
  private contractor: any;
  private title: any;
  private apiUrl = `${environment.apiUrl}/contractors`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  setContractor(contractor: any) {
    this.contractor = contractor;

  }

  getContractor() {
    return this.contractor;
  }

  // Get all contractors
  getAllContractors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any[]>('getAllContractors', []))
    );
  }

  // Get contractor by ID
  getContractorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>(`getContractorById id=${id}`))
    );
  }

  // Add a new contractor
  addContractor(contractor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, contractor, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>('addContractor'))
    );
  }

  // Update an existing contractor
  updateContractor(id: number, contractor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contractor, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>(`updateContractor id=${id}`))
    );
  }

  // Delete a contractor
  deleteContractor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<any>(`deleteContractor id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://3.93.0.237:3000/api/login';
  // private apiUrl = 'http://3.93.0.237:3000/api/login';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { usuario, password }).pipe(
      tap(response => {
        console.log(response);
        
        // if (response) {
        //   this.currentUserSubject.next(response);
        //   console.log(">>>>>>>>>>>"+this.currentUserSubject.value);
        // }
      })
    );
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  logout(){
    this.currentUserSubject.next(null);
    console.log("Usuario deslogueado");
  }
}
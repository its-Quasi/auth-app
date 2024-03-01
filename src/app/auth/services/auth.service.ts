import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { User, AuthStatus, LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private readonly baseUrl = environment.url

  private currentUser = signal<User | null> (null)
  private authState = signal<AuthStatus> (AuthStatus.CHEKING)

  login(email : string, password : string) : Observable<boolean> {
    
    const url = `${this.baseUrl}/auth/login`
    const body = {
      email,
      password
    }

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({user, token}) => {
        this.currentUser.set(user)
        this.authState.set(AuthStatus.AUTHENTICATED)
        localStorage.setItem('token' , token)
      }),
      map(() => true)
    )

  }
}

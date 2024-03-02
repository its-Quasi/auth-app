import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { User, AuthStatus, LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private readonly baseUrl = environment.url

  public currentUser = signal<User | null>(null)
  public authState = signal<AuthStatus>(AuthStatus.CHEKING)

  private setAuthentication(user: User, token: string) {
    this.currentUser.set(user)
    this.authState.set(AuthStatus.AUTHENTICATED)
    localStorage.setItem('token', token)
    return true
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`
    const body = {
      email,
      password
    }
    return this.http.post<LoginResponse>(url, body).pipe(
      map(res => {
        const { token, __v, ...user } = res
        return this.setAuthentication(user, token)
      }),
      catchError(err => throwError(() => err.error.message))
    )
  }

  checkStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token')
    if (!token) return of(false)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<{ user: User, token: string }>(url, { headers }).pipe(
      map(({ token, user }) => this.setAuthentication(user, token)),
      catchError(() => {
        this.authState.set(AuthStatus.NOT_AUTHENTICATED)
        return of(false)
      })
    )
  }
}

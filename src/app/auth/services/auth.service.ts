import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthResponse, Status, User } from '../interfaces/auth.interface';


const tokenResponse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = signal<User | undefined>(undefined)
  private _state = signal<Status>('checking')
  private _token = signal<string | undefined>(undefined)


  http = inject(HttpClient)
  router = inject(Router)

  user = computed(this._user)

  state = computed(() => {
    if (this._state() === 'checking') return 'checking'

    if (this.user()) return 'authenticated'

    return 'not-authenticated'
  })


  isAdmin = computed(() => this.user()?.role.includes('admin') ?? false)

  registrer(){
    
  }


  login(email: string, password: string): Observable<boolean> {

    if(email !== 'mz2458594@gmail.com' || password !== '123') return of(false)


    return of(this.handleSuccess({
      user: {
        email,
        password,
        role: 'client'
      },
      token: tokenResponse
    }))
  }


  logout() {
    this._user.set(undefined)
    this._state.set('not-authenticated')
    this._token.set(undefined)
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }


  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) return of(false)

    return of(this.handleSuccess({
      user: {
        email: 'mz2458594@gmail.com',
        password: '123',
        role: 'client'
      },
      token: token
    }))

  }

  handleSuccess(response: AuthResponse): boolean {
    this._user.set(response.user);
    this._state.set('authenticated')
    this._token.set(response.token)
    localStorage.setItem('token', response.token)
    return true;
  }

}

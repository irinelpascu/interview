import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TOKEN } from '../consts/storage.const';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: string, pass: string) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(environment.API_URL + 'auth', {username: user, password: pass}, {headers})
      .subscribe((data: any) => {
        localStorage.setItem(TOKEN, data.token);
        this.router.navigate(['/books']);

      });
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return jwtDecode(localStorage.getItem(TOKEN)).admin;
  }
}

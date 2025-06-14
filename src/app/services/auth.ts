import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    return true;
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    location.reload(); // or navigate to login
  }
}

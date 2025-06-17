import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModal } from './components/auth-modal/auth-modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AuthModal,
    CommonModule,
    FormsModule,
  ],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">My Angular App</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-flex" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/books" routerLinkActive="active"
                >Books</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/quotes" routerLinkActive="active"
                >Quotes</a
              >
            </li>
          </ul>

          <div class="btn-group ">
            <div *ngIf="!authService.isAuthenticated()" class="nav-item ms-2">
              <button
                class="btn btn-outline-light"
                (click)="showLogin = true; authMode = 'login'"
              >
                Login
              </button>
            </div>
            <div *ngIf="!authService.isAuthenticated()" class="nav-item ms-2">
              <button
                class="btn btn-outline-light"
                (click)="showLogin = true; authMode = 'register'"
              >
                Register
              </button>
            </div>
            <div *ngIf="authService.isAuthenticated()" class="nav-item ms-2">
              <button
                class="btn btn-outline-light"
                (click)="authService.logout()"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <app-auth-modal
      [showModal]="showLogin"
      [mode]="authMode"
      (submit)="handleAuth($event)"
      (close)="showLogin = false"
      [message]="message"
    >
    </app-auth-modal>

    <main
      class="container mt-4 mh-100 d-flex flex-column"
      style="min-height: 69.3vh"
    >
      <router-outlet></router-outlet>
    </main>
    <footer class="footer bg-dark text-white-50 mt-5 position-relative  w-100 ">
      <div class="container text-center py-3  ">
        <p class="">My Angular App</p>
        <i class="fas fa-footer fa-copyright"></i>
        <span class="ms-1">2023</span>
      </div>
    </footer>
  `,
  styleUrl: './app.css',
})
export class App {
  constructor(public authService: AuthService) {}
  private http = inject(HttpClient);
  message: string = '';
  // DEVELOPMENT
  private baseUrl =
    'https://bookquotesapi-e8hyd6gxfnfedqaf.swedencentral-01.azurewebsites.net'; // Change port if needed
  // private baseUrl = 'https://localhost:7031'; // Change port if needed

  handleAuth(formData: {
    username: string;
    password: string;
    confirmPassword?: string;
  }) {
    console.log('handle auth Form Data from event:', formData);
    if (
      formData.password !== formData.confirmPassword &&
      this.authMode === 'register'
    ) {
      console.error('Passwords do not match');
      this.message = 'Passwords do not match';
      this.showLogin = true;
      this.authMode = 'register';
      return;
    }
    if (!formData.username || !formData.password) {
      console.error('Username and password are required');
      this.message = 'Username and password are required';
      this.showLogin = true;
      this.authMode = 'register';
      return;
    }
    if (this.authMode === 'register') {
      this.http.post(`${this.baseUrl}/register`, formData).subscribe();
    } else {
      this.http.post(`${this.baseUrl}/login`, formData).subscribe({
        next: (res: any) => {
          console.log('Login response:', res);
          if (res && res.token) {
            this.authService.saveToken(res.token); // save JWT
            this.showLogin = false;
            this.authMode = 'login';
          }
        },
        error: (err) => {
          // Handle 400, 401, etc.
          console.error('Login failed', err);
          this.message = 'Login failed. Please check your credentials.';
          this.showLogin = true;
          this.authMode = this.authMode === 'register' ? 'register' : 'login';
        },
      });
    }
  }
  protected title = 'my-app';
  showLogin: boolean = false;
  authMode: 'login' | 'register' = 'login';
}

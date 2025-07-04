import {
  Component,
  inject,
  signal,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModal } from './components/auth-modal/auth-modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { delay } from 'rxjs';

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
  encapsulation: ViewEncapsulation.None,
  standalone: true,

  template: `
    <nav class="navbar navbar-expand-lg ">
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
                class="btn btn-outline-light text-dark"
                (click)="showLogin.set(true); authMode.set('login')"
              >
                Login
              </button>
            </div>
            <div *ngIf="!authService.isAuthenticated()" class="nav-item ms-2">
              <button
                class="btn btn-outline-light text-dark"
                (click)="showLogin.set(true); authMode.set('register')"
              >
                Register
              </button>
            </div>
            <div *ngIf="authService.isAuthenticated()" class="nav-item ms-2">
              <button
                class="btn btn-dark text-white border border-light"
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
      [showModal]="showLogin()"
      [mode]="authMode()"
      (submit)="handleAuth($event)"
      (close)="showLogin.set(false); message.set('')"
      [message]="message()"
    >
    </app-auth-modal>
    <div *ngIf="message()" role="alert" [ngClass]="messageType() === 'success' ? 'alert alert-success text-center py-2' : 'alert alert-danger text-center py-2'">
      {{ message() }}
    </div>
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
  protected title = 'my-app';
  showLogin = signal(false);
  authMode = signal<'login' | 'register'>('login');
  private http = inject(HttpClient);
  isSendingRequest = signal(false);
  message = signal('');
  messageType = signal<'success' | 'error'>('success');

  // DEVELOPMENT
  // private baseUrl = 'https://bookquotesapi-e8hyd6gxfnfedqaf.swedencentral-01.azurewebsites.net';

  private baseUrl = 'https://localhost:7031';

  handleAuth(formData: {
    username: string;
    password: string;
    confirmPassword?: string;
  }) {
    // Clear previous messages
    this.message.set('');
    this.messageType.set('success');

    if (!formData.username || !formData.password) {
      this.message.set('Username and password are required.');
      this.messageType.set('error');
      return;
    }

    if (
      this.authMode() === 'register' &&
      formData.password !== formData.confirmPassword
    ) {
      this.message.set('Passwords do not match.');
      this.messageType.set('error');
      return;
    }

    this.isSendingRequest.set(true);

    if (this.authMode() === 'register') {
      this.http.post(`${this.baseUrl}/register`, formData, { responseType: 'text' }).subscribe({
        next: (res: any) => {
          this.message.set('Registration successful! You can now log in.');
          this.messageType.set('success');
          this.authMode.set('login');
          this.isSendingRequest.set(false);
        },
        error: (err) => {
          this.message.set(typeof err.error === 'string' ? err.error : 'Registration failed.');
          this.messageType.set('error');
          this.isSendingRequest.set(false);
        },
      });
      return;
    }

    if (this.authMode() === 'login') {
      this.http.post(`${this.baseUrl}/login`, formData).subscribe({
        next: (res: any) => {
          if (res && res.token) {
            this.authService.saveToken(res.token); // save JWT
            this.showLogin.set(false);
            this.message.set('Login successful!');
            this.messageType.set('success');
          } else {
            this.message.set('Login failed: No token received.');
            this.messageType.set('error');
          }
          this.isSendingRequest.set(false);
        },
        error: (err) => {
          this.message.set(typeof err.error === 'string' ? err.error : 'Login failed.');
          this.messageType.set('error');
          this.isSendingRequest.set(false);
        },
      });
      return;
    }
  }
}

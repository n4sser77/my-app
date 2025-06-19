import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
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
                class="btn btn-outline-light"
                (click)="showLogin.set(true); authMode.set('login')"
              >
                Login
              </button>
            </div>
            <div *ngIf="!authService.isAuthenticated()" class="nav-item ms-2">
              <button
                class="btn btn-outline-light"
                (click)="showLogin.set(true); authMode.set('register')"
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
      [showModal]="showLogin()"
      [mode]="authMode()"
      (submit)="handleAuth($event)"
      (close)="showLogin.set(false); message.set('')"
      [message]="message()"
    >
    </app-auth-modal>
    <div role="alert" class="alert alert-secondary  text-center py-2">
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

  // DEVELOPMENT
  private baseUrl =
    'https://bookquotesapi-e8hyd6gxfnfedqaf.swedencentral-01.azurewebsites.net'; // Change port if needed
  // private baseUrl = 'https://localhost:7031'; // Change port if needed

  handleAuth(formData: {
    username: string;
    password: string;
    confirmPassword?: string;
  }) {
    // console.log('handle auth Form Data from event:', formData);
    if (
      formData.password !== formData.confirmPassword &&
      this.authMode() === 'register' &&
      !this.isSendingRequest()
    ) {
      // console.error('Passwords do not match');
      this.message.set('Passwords do not match');

      this.authMode.set(this.authMode() === 'register' ? 'register' : 'login');
      return;
    }
    if (
      (!formData.username || !formData.password) &&
      !this.isSendingRequest()
    ) {
      // console.error('Username and password are required');
      this.message.set('Username and password are required');

      this.authMode.set(this.authMode() === 'register' ? 'register' : 'login');
      return;
    }

    // if this point is reached a request will be sent
    this.isSendingRequest.set(true);

    if (this.authMode() === 'register') {
      this.message.set('Registering...');
      this.http.post(`${this.baseUrl}/register`, formData).subscribe({
        next: (res: any) => {
          if (res && res.status === 200) {
            this.message.set(res.message);
            this.authMode.set('login');
          }
        },
        error: (err) => {
          this.message.set(err.error);

          this.authMode.set(
            this.authMode() === 'register' ? 'register' : 'login'
          );
        },
      });
    }

    if (this.authMode() === 'login') {
      this.message.set('Logging in...');
      this.http.post(`${this.baseUrl}/login`, formData).subscribe({
        next: (res: any) => {
          // console.log('Login response:', res);
          if (res && res.token) {
            this.authService.saveToken(res.token); // save JWT
            this.showLogin.set(false);

            // Optionally, you can navigate to a different page after login
            // this.router.navigate(['/books']);
          }
          if (res && res.message) {
            this.message.set(res.message); // Handle any message from the server
          }
        },
        error: (err) => {
          // Handle 400, 401, etc.
          // console.error('Login failed', err);
          this.message.set(err.error);

          this.authMode.set(
            this.authMode() === 'register' ? 'register' : 'login'
          );
        },
      });
    }
    // request is finished
    this.isSendingRequest.set(false);
  }
}

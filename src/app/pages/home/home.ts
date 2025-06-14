import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="container d-flex flex-column align-items-center justify-content-center"
      style="min-height: 70vh;"
    >
      <div class="text-center">
        <i class="fas fa-book-open fa-4x text-primary mb-4"></i>
        <h1 class="display-4 mb-3">Welcome!</h1>
        <p class="lead mb-4">
          Manage your
          <span class="fw-bold text-success"
            ><i class="fas fa-book"></i> Books</span
          >
          and
          <span class="fw-bold text-warning"
            ><i class="fas fa-quote-left"></i> Quotes</span
          >
          with ease.
        </p>
        <div class="d-flex justify-content-center gap-3">
          <a routerLink="/books" class="btn btn-primary btn-lg">
            <i class="fas fa-book"></i> Go to Books
          </a>
          <a routerLink="/quotes" class="btn btn-warning btn-lg text-white">
            <i class="fas fa-quote-left"></i> Go to Quotes
          </a>
        </div>
      </div>
    </div>
  `,
})
export class Home {
  protected title = 'my-app-home';
  protected description = 'Welcome to the home page of my Angular app!';
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1 class="display-4  text-center">My Angular App</h1>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">My Angular App</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="books" routerLinkActive="active"
                >Books</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="quotes" routerLinkActive="active"
                >Quotes</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
    <footer class="footer bg-dark text-white-50 mt-5">
      <div class="container text-center py-3">
        <span class=" ">My Angular App</span>
      </div>
    </footer>
  `,
  styleUrl: './app.css',
})
export class App {
  protected title = 'my-app';
}

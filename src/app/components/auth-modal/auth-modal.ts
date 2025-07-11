import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AuthData {
  username: string;
  password: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="modal fade"
      tabindex="-1"
      [class.show]="showModal"
      [style.display]="showModal ? 'block' : 'none'"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ mode === 'register' ? 'Register' : 'Login' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              (click)="closeModal()"
            ></button>
          </div>
          <div class="modal-body">
            <form #form="ngForm" (ngSubmit)="onSubmit()">
              <div class="mb-2">
                <input
                  class="form-control"
                  [(ngModel)]="username"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div class="mb-2">
                <input
                  class="form-control"
                  [(ngModel)]="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div *ngIf="mode === 'register'" class="mb-2">
                <input
                  class="form-control"
                  [(ngModel)]="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">
                {{ mode === 'register' ? 'Register' : 'Login' }}
              </button>

              <span class="text-danger d-block mt-2" *ngIf="message">
                {{ message }}
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AuthModal {
  @Input() showModal = false;
  @Input() mode: 'login' | 'register' = 'login';
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  @Output() submit = new EventEmitter<AuthData>();

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor() {}

  closeModal() {
    this.close.emit();
    this.reset();
    this.message = '';
    this.showModal = false;
  }

  onSubmit() {
    this.submit.emit({
      username: this.username,
      password: this.password,
      ...(this.mode === 'register'
        ? { confirmPassword: this.confirmPassword }
        : {}),
    });
  }

  private reset() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }
}

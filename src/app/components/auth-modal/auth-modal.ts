import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
              <button class="btn btn-primary w-100">
                {{ mode === 'register' ? 'Register' : 'Login' }}
              </button>
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
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  username = '';
  password = '';
  confirmPassword = '';

  closeModal() {
    this.close.emit();
    this.reset();
  }

  onSubmit() {
    // Validate form inputs

    if (!this.username || !this.password) {
      alert('Username and password are required!');
      return;
    }
    if (this.mode === 'register' && this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    alert(`Submitting form: ${this.mode} with username: ${this.username}`);
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

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule],
  standalone: true,
  template: `
     <form (ngSubmit)="onSubmit()" class="mb-3">
    <div class="mb-2">
      <input class="form-control" [(ngModel)]="title" name="title" placeholder="Title" />
    </div>
    <div class="mb-2">
      <input class="form-control" [(ngModel)]="author" name="author" placeholder="Author" />
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      [disabled]="!title || !author"
    >
      Add
    </button>
  </form>
  `,
  styles: [
    `
      .form-group {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class BookForm {
  title = '';
  author = '';

  onSubmit() {
    console.log('Book added:', { title: this.title, author: this.author });
    // move the books array to a service or parent component
    // to handle the addition of the book
    // Reset the form fields after submission
    this.resetForm();
  }

  resetForm() {
    this.title = '';
    this.author = '';
  }
}

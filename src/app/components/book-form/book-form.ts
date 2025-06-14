import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/bookService';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule],
  standalone: true,
  template: `
    <form (ngSubmit)="onSubmit()" class="mb-3 w-75 w-lg-50 mx-auto">
      <h2 class="text-center mb-4">Add a New Book</h2>
      <div class="mb-2 form-group">
        <input
          class="form-control form-control-lg "
          type="text"
          [(ngModel)]="title"
          name="title"
          placeholder="Title"
        />
      </div>
      <div class="mb-2 form-group">
        <input
          class="form-control form-control-lg"
          type="text"
          [(ngModel)]="author"
          name="author"
          placeholder="Author"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        [disabled]="!title || !author"
      >
        <i class="fas fa-plus"></i> Add Book
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
  constructor(private bookService: BookService) {}
  title = '';
  author = '';

  onSubmit() {
    console.log('Book added:', { title: this.title, author: this.author });
    // move the books array to a service or parent component
    // to handle the addition of the book
    // Reset the form fields after submission
    this.bookService.addBook({ title: this.title, author: this.author });
    this.resetForm();
  }

  resetForm() {
    this.title = '';
    this.author = '';
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../services/bookService';
import { BookForm } from '../../components/book-form/book-form';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-book-list',
  imports: [BookForm, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  constructor(private bookService: BookService, public authService: AuthService) {}

  showModal = false;
  editId: string | null = null;
  editTitle = '';
  editAuthor = '';

  get books(): Book[] {
    return this.bookService.getBooks();
  }
  editBook(guid: string) {
    const book = this.books.find((b) => b.guid === guid);
    if (book) {
      this.editId = guid;
      this.editTitle = book.title;
      this.editAuthor = book.author;
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.editId = null;
    this.editTitle = '';
    this.editAuthor = '';
  }

  saveEdit() {
    if (this.editId !== null) {
      this.bookService.editBook(this.editId, {
        title: this.editTitle,
        author: this.editAuthor,
      });
      this.closeModal();
    }
  }

  removeBook(guid: string) {
    this.bookService.removeBook(guid);
  }
}

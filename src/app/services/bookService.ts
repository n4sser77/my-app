import { Injectable } from '@angular/core';

export interface Book {
  id: number;
  title: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Book[] = [
    { id: 0, title: '1984', author: 'George Orwell' },
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 3, title: 'Moby Dick', author: 'Herman Melville' }
  ];

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Omit<Book, 'id'>) {
    const id = this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 0;
    this.books.push({ id, ...book });
  }

  removeBook(id: number) {
    this.books = this.books.filter(book => book.id !== id);
  }
}
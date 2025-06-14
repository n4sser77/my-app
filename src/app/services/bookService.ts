import { Injectable, signal } from '@angular/core';
import { DataRepository } from './dataRepository';

export interface Book {
  guid: string;
  title: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private dataRepository: DataRepository) {
    this.loadBooks();
  }
  private books = signal<Book[]>([]);

  loadBooks = () => {
    this.dataRepository.getBooks().subscribe((books: Book[]) => {
      this.books.set(books);
      console.log('Getting books:', this.books);
    });
  };

  getBooks(): Book[] {
    return this.books();
  }

  addBook(book: Omit<Book, 'guid'>) {
    this.dataRepository.addBook(book).subscribe((newBook: Book) => {
      this.books.update((currentBooks) => [...currentBooks, newBook]);
      console.log('Updated books:', this.books());
    });
  }

  editBook(guid: string, updatedBook: Omit<Book, 'guid'>) {
    const book = this.books().find((book) => book.guid === guid);
    if (book) {
      Object.assign(book, updatedBook);
      this.dataRepository.updateBook(guid, book).subscribe();
    }
  }
  removeBook(guid: string) {
    this.dataRepository.deleteBook(guid).subscribe();
    this.books.update((currentBooks) =>
      currentBooks.filter((book) => book.guid !== guid)
    );
  }

  getBookById(guid: string): Book | undefined {
    return this.books().find((book) => book.guid === guid);
  }
}

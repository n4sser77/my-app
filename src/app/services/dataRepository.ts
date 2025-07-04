import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from './quoteService';
import { Book } from './bookService';

@Injectable({
  providedIn: 'root',
})
export class DataRepository {
  private http = inject(HttpClient);
  //DEVELOPMENT
  private baseUrl = 'https://localhost:7031'; // Change port if needed
  // private baseUrl = 'https://bookquotesapi-e8hyd6gxfnfedqaf.swedencentral-01.azurewebsites.net';

  // BOOKS
  getBooks(): Observable<Book[]> {
    console.log('Fetching books from:', `${this.baseUrl}/books`);
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  addBook(book: Omit<Book, 'guid'>): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/books`, book);
  }

  updateBook(guid: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/books/${guid}`, book);
  }

  deleteBook(guid: string): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/books/${guid}`);
  }

  // QUOTES
  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/quotes`);
  }

  addQuote(quote: Omit<Quote, 'guid'>): Observable<Quote> {
    return this.http.post<Quote>(`${this.baseUrl}/quotes`, quote);
  }

  updateQuote(guid: string, quote: Quote): Observable<any> {
    return this.http.put(`${this.baseUrl}/quotes/${guid}`, quote);
  }

  deleteQuote(guid: string): Observable<Quote> {
    return this.http.delete<Quote>(`${this.baseUrl}/quotes/${guid}`);
  }
}

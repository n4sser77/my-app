import { Injectable, OnInit, signal } from '@angular/core';
import { DataRepository } from './dataRepository';

export interface Quote {
  guid: string;
  text: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private dataRepository: DataRepository) {
    this.loadQuotes();
  }
  private quotes = signal<Quote[]>([]);

  loadQuotes = () => {
    this.dataRepository.getQuotes().subscribe((quotes: Quote[]) => {
      this.quotes.set(quotes);
    });
  };

  getQuotes(): Quote[] {
    return this.quotes();
  }

  addQuote(quote: Omit<Quote, 'guid'>) {
    this.dataRepository.addQuote(quote).subscribe((newQuote: Quote) => {
      this.quotes.update((currentQuotes) => [...currentQuotes, newQuote]);
    });
  }

  editQuote(guid: string, updatedQuote: Partial<Quote>) {
    const quote = this.quotes().find((q) => q.guid === guid);
    if (quote) {
      Object.assign(quote, updatedQuote);
    }
  }

  removeQuote(guid: string) {
    this.dataRepository.deleteQuote(guid).subscribe(() => {
      this.quotes.update((currentQuotes) =>
        currentQuotes.filter((q) => q.guid !== guid)
      );
    });
  }
  getQuoteById(guid: string): Quote | undefined {
    return this.quotes().find((q) => q.guid === guid);
  }
}

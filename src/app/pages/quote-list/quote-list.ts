import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../../services/quoteService';
import { Quote } from '../../services/quoteService';
import { QuoteForm } from '../../components/quote-form/quote-form';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-quote-list',
  imports: [CommonModule, FormsModule, QuoteForm],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css',
})
export class QuoteList {
  constructor(
    private quoteService: QuoteService,
    public authService: AuthService
  ) {}

  showModal = false;
  editId: string | null = null;
  editText = '';
  editAuthor = '';

  get quotes(): Quote[] {
    return this.quoteService.getQuotes();
  }
  editQuote(guid: string) {
    const quote = this.quotes.find((q) => q.guid === guid);
    if (quote) {
      this.editId = guid;
      this.editText = quote.text;
      this.editAuthor = quote.author;
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.editId = null;
    this.editText = '';
    this.editAuthor = '';
  }

  saveEdit() {
    if (this.editId !== null) {
      this.quoteService.editQuote(this.editId, {
        text: this.editText,
        author: this.editAuthor,
      });
      this.closeModal();
    }
  }

  removeQuote(guid: string) {
    this.quoteService.removeQuote(guid);
  }
}

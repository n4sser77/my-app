import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../../services/quoteService';

@Component({
  selector: 'app-quote-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  template: `
    <form (ngSubmit)="onSubmit()" class="mb-3 w-75 w-lg-50 mx-auto">
      <h2 class="text-center mb-4">Add a New Quote</h2>
      <div class="mb-2 form-group">
        <input
          class="form-control form-control-lg "
          type="text"
          [(ngModel)]="text"
          name="text"
          placeholder="Quote Text"
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
        [disabled]="!text || !author"
      >
        <i class="fas fa-plus"></i> Add Quote
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
export class QuoteForm {
  constructor(private quoteService: QuoteService) {}
  text = '';
  author = '';

  onSubmit() {
    console.log('Quote added:', { text: this.text, author: this.author });
    this.quoteService.addQuote({ text: this.text, author: this.author });
    this.resetForm();
  }

  resetForm() {
    this.text = '';
    this.author = '';
  }
}

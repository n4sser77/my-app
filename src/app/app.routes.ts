import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { QuoteList } from './pages/quote-list/quote-list';

export const routes: Routes = [
  {
    path: 'books',
    component: BookList,
  },
  {
    path: 'quotes',
    component: QuoteList,
  },
];

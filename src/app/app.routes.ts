import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { QuoteList } from './pages/quote-list/quote-list';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home, // Default route
  },
  {
    path: 'books',
    component: BookList,
  },
  {
    path: 'quotes',
    component: QuoteList,
  },
];

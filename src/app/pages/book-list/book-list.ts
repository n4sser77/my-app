import { Component } from '@angular/core';
import { BookService, Book } from '../../services/bookService';
import { BookForm } from '../book-form/book-form';

@Component({
  selector: 'app-book-list',
  imports: [BookForm],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  get books(): Book[] {
    return this.bookService.getBooks();
  }

  showBookForm = false;

  constructor(private bookService: BookService) {}

  removeBook(id: number) {
    this.bookService.removeBook(id);
  }

  addBookClicked(){
    //display book form
    this.showBookForm = true;
    // render form

  }
}

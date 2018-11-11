import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Direction } from '../enums/direction.enum';
import { Sort } from '../enums/sort.enum';
import { environment } from '../../../environments/environment';
import {
  BehaviorSubject,
  Observable
} from 'rxjs/index';
import { BookModel } from '../models/book.model';
import { tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  page: number;
  pageSize: number;
  sortDirection: string;
  sortBy: string;

  books$: BehaviorSubject<BookModel[]> = new BehaviorSubject<BookModel[]>([]);

  constructor(private http: HttpClient) {
    this.page = 0;
    this.pageSize = 20;
    this.sortDirection = Direction.ASC;
    this.sortBy = Sort.author;
  }

  getBooks() {
    const params = {
      author: '',
      title: '',
      language: '',
      page: this.page.toString(),
      pageSize: this.pageSize.toString(),
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };
    const headers = {'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token')};
    this.http.get(environment.API_URL + 'books', {headers, params})
      .subscribe((books: BookModel[]) => this.books$.next(this.books$.getValue().concat(...books)));
    return this.books$;
  }

  searchBooks(author: string = '', title: string = '', language: string = '') {
    this.resetpage();
    const params = {
      author,
      title,
      language,
      page: this.page.toString(),
      pageSize: this.pageSize.toString(),
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };
    const headers = {'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token')};
    this.http.get(environment.API_URL + 'books', {headers, params})
      .subscribe((books: BookModel[]) => this.books$.next(books));
    return this.books$;
  }

  getBookById(bookId: string = '') {
    const params = {
      id: bookId
    };
    const headers = {'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token')};
    return this.http.get(environment.API_URL + 'books', {headers, params}) as Observable<BookModel>;
  }

  saveBook(book: BookModel) {
    const headers = {'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token')};
    return this.http.put(environment.API_URL + 'books', book, {headers})
      .pipe(
        tap((savedBook: BookModel) => {
          this.books$.next(this.books$.getValue().map(tempBook => tempBook.id === savedBook.id ? savedBook : tempBook));
        })
      );
  }

  addBook(book: BookModel) {
    const headers = {'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token')};
    return this.http.post(environment.API_URL + 'books', book, {headers})
      .pipe(
        tap((savedBook: BookModel) => {
          this.books$.next(this.books$.getValue().concat(book));
        })
      );
  }

  loadNextPage() {
    this.page++;
    this.getBooks();
  }

  getSortedBooks(field: string) {
    this.resetpage();

    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === Direction.DESC ? Direction.ASC : Direction.DESC;
    } else {
      this.sortBy = field;
      this.sortDirection = Direction.ASC;
    }
    const params = {
      author: '',
      title: '',
      language: '',
      page: this.page.toString(),
      pageSize: this.pageSize.toString(),
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };
    const headers = {'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token')};
    this.http.get(environment.API_URL + 'books', {headers, params})
      .subscribe((books: BookModel[]) => this.books$.next(books));
    return this.books$;
  }

  deleteBook(bookId) {
    const headers = {'Content-Type': 'text/plain', 'x-auth-token': localStorage.getItem('token')};
    this.http.delete(environment.API_URL + 'books', {headers, params: {id: bookId}})
      .subscribe((deleted: BookModel) => this.books$.next(this.books$.getValue().filter(book => book.id !== deleted.id)));
  }

  private resetpage() {
    this.page = 0;
  }
}


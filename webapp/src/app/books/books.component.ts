import {
  Component,
  OnInit
} from '@angular/core';
import {
  BehaviorSubject,
  merge,
  Observable
} from 'rxjs/index';
import { BookService } from '../shared/services/book.service';
import { BookModel } from '../shared/models/book.model';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material';
import {
  debounceTime,
  take,
  takeUntil
} from 'rxjs/internal/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  authorFormControl: FormControl;
  titleFormControl: FormControl;
  languageFormControl: FormControl;

  books$: BehaviorSubject<BookModel[]>;

  constructor(private bookService: BookService,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.books$ = this.bookService.books$;

    this.authorFormControl = new FormControl('');
    this.titleFormControl = new FormControl('');
    this.languageFormControl = new FormControl('');
    merge(this.authorFormControl.valueChanges, this.titleFormControl.valueChanges, this.languageFormControl.valueChanges)
      .pipe(
        debounceTime(200)
      )
      .subscribe(() => this.search());
  }

  onScroll() {
    this.bookService.loadNextPage();
  }

  onLogout() {
    this.authService.logout();
  }

  onSortClick(field: string) {
    this.bookService.getSortedBooks(field);
  }

  onDeleteClick(book: BookModel) {
    const snackbar = this.snackBar.open(
      `Are you sure you want to delete ${book.author}-${book.title}?`,
      'Yes',
      {duration: 2000}
    );
    snackbar.onAction()
      .pipe(
        take(1),
        takeUntil(snackbar.afterDismissed())
      )
      .subscribe(() => {
        this.bookService.deleteBook(book.id);
      });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getSortBy(): string {
    return this.bookService.sortBy;
  }

  getSortDirection(): string {
    return this.bookService.sortDirection;
  }

  trackByFunction(book) {
    return book.id;
  }

  private search() {
    this.bookService.searchBooks(this.authorFormControl.value, this.titleFormControl.value, this.languageFormControl.value);
  }
}

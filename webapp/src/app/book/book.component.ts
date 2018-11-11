import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { BookService } from '../shared/services/book.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { BookModel } from '../shared/models/book.model';
import { switchMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  formGroup: FormGroup;
  book: BookModel;

  constructor(private activatedRoute: ActivatedRoute,
              private builder: FormBuilder,
              private bookService: BookService,
              private authService: AuthService,
              private location: Location) {
    this.activatedRoute.params
      .pipe(
        switchMap(params => this.bookService.getBookById(params.id))
      ).subscribe(book => {
      this.book = book;
      this.formGroup.get('author').setValue(book ? book.author : '');
      this.formGroup.get('country').setValue(book ? book.country : '');
      this.formGroup.get('imageLink').setValue(book ? book.imageLink : '');
      this.formGroup.get('language').setValue(book ? book.language : '');
      this.formGroup.get('link').setValue(book ? book.link : '');
      this.formGroup.get('pages').setValue(book ? book.pages : '');
      this.formGroup.get('title').setValue(book ? book.title : '');
      this.formGroup.get('year').setValue(book ? book.year : '');
    });
  }

  ngOnInit() {
    this.formGroup = this.builder.group({
      author: ['', Validators.required],
      country: ['', Validators.required],
      imageLink: ['', Validators.required],
      language: ['', Validators.required],
      link: ['', Validators.required],
      pages: ['', Validators.required],
      title: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  onBack() {
    this.location.back();
  }

  onLogout() {
    this.authService.logout();
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    this.bookService[this.book && this.book.id ? 'saveBook' : 'addBook'](Object.assign({}, this.book, this.formGroup.getRawValue()))
      .subscribe(() => {
        this.location.back();
      });
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksGuard implements CanActivate {
  constructor(private bookService: BookService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.bookService.getBooks().pipe(
      map(books => !!books)
    );
  }
}

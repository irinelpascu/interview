import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { BooksGuard } from './shared/guards/books.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'books',
    canActivate: [AuthGuard, BooksGuard],
    component: BooksComponent,
  },
  {
    path: 'book/:id',
    canActivate: [AuthGuard],
    component: BookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

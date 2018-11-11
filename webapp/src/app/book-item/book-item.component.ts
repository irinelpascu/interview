import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BookModel } from '../shared/models/book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input() book: BookModel;
  @Input() isAdmin: boolean;
  @Output() delete: EventEmitter<BookModel> = new EventEmitter<BookModel>();

  constructor() {
  }

  ngOnInit() {
  }

  onDeleteClick(event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    this.delete.emit(this.book);
  }
}

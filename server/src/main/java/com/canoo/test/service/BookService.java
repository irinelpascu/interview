package com.canoo.test.service;

import com.canoo.test.model.Book;

import java.util.List;


public interface BookService {

    Book create(Book object);

    Book find(String id);

    List<Book> search(String author, String language, String title, int page, int pageSize, String sortDirection, String sortBy);

    List<Book> findAll();

    Book update(String id, Book object);

    Book delete(String id);
}

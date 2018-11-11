package com.canoo.test.service;

import com.canoo.test.model.Book;
import com.canoo.test.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repository;

    @Autowired
    public BookServiceImpl(final BookRepository repository) {
        this.repository = repository;
    }

    public Book create(final Book Book) {
        Book.setCreatedAt(String.valueOf(LocalDateTime.now()));
        return repository.save(Book);
    }

    public Book find(final String id) {
        return repository.findOne(id);
    }

    public List<Book> findAll() {
        return repository.findAll();
    }

    public List<Book> search(final String author, final String language, final String title, final int page, final int pageSize, final String sortDirection, final String sortBy) {
        return repository.query(author, language, title, new PageRequest(page, pageSize, new Sort(Sort.Direction.valueOf(sortDirection), sortBy))).getContent();
    }

    public Book update(final String id, final Book Book) {
        Book.setId(id);

        final Book saved = repository.findOne(id);

        if (saved != null) {
            Book.setCreatedAt(saved.getCreatedAt());
            Book.setUpdatedAt(String.valueOf(LocalDateTime.now()));
        } else {
            Book.setCreatedAt(String.valueOf(LocalDateTime.now()));
        }
        repository.save(Book);
        return Book;
    }

    public Book delete(final String id) {
        final Book saved = repository.findOne(id);

        repository.delete(id);

        return saved;
    }
}

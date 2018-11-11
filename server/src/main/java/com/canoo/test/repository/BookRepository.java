package com.canoo.test.repository;

import com.canoo.test.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface BookRepository extends MongoRepository<Book, String> {
    @Query(value = "{ $and: [ { 'author' : {$regex:?0, $options:'i'} }, { 'language' : {$regex:?1,$options:'i'} }, { 'title' : {$regex:?2,$options:'i'} } ] }")
    Page<Book> query(final String author, final String language, final String title, Pageable pageable);
}

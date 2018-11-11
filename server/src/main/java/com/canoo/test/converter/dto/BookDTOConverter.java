package com.canoo.test.converter.dto;

import com.canoo.test.dto.BookDTO;
import com.canoo.test.model.Book;
import org.springframework.core.convert.converter.Converter;


public class BookDTOConverter implements Converter<BookDTO, Book> {

    @Override
    public Book convert(final BookDTO dto) {
        final Book book = new Book();

        book.setId(dto.getId());
        book.setAuthor(dto.getAuthor());
        book.setCountry(dto.getCountry());
        book.setImageLink(dto.getImageLink());
        book.setLanguage(dto.getLanguage());
        book.setLink(dto.getLink());
        book.setPages(dto.getPages());
        book.setTitle(dto.getTitle());
        book.setYear(dto.getYear());

        return book;
    }
}

package com.canoo.test.controller;

import com.canoo.test.converter.ConverterFacade;
import com.canoo.test.dto.BookDTO;
import com.canoo.test.dto.UserDTO;
import com.canoo.test.model.Authority;
import com.canoo.test.model.Book;
import com.canoo.test.service.BookService;
import com.canoo.test.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService service;

    private final ConverterFacade converterFacade;

    @Autowired
    public BookController(final BookService service,
                          final ConverterFacade converterFacade) {
        this.service = service;
        this.converterFacade = converterFacade;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> insertBook(@RequestBody final BookDTO dto) {
        return new ResponseEntity<>(service.create(converterFacade.convert(dto)), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> updateBook(@RequestBody final BookDTO dto) {
        Book book = converterFacade.convert(dto);
        return new ResponseEntity<>(service.update(book.getId(), book), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> fetchAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, params = "id")
    public ResponseEntity<?> fetchOne(@RequestParam final String id) {
        return new ResponseEntity<>(service.find(id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"author", "language", "title", "page", "pageSize"})
    public ResponseEntity<?> searchBook(@RequestParam("author") final String author,
                                        @RequestParam("language") final String language,
                                        @RequestParam("title") final String title,
                                        @RequestParam("page") final int page,
                                        @RequestParam("pageSize") final int pageSize,
                                        @RequestParam("sortDirection") final String sortDirection,
                                        @RequestParam("sortBy") final String sortBy) {
        return new ResponseEntity<>(service.search(author, language, title, page, pageSize, sortDirection, sortBy), HttpStatus.OK);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping(method = RequestMethod.DELETE, params = "id")
    public ResponseEntity<?> deleteOne(@RequestParam final String id) {
        return new ResponseEntity<>(service.delete(id), HttpStatus.OK);
    }
}


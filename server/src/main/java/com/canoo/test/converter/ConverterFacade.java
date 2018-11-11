package com.canoo.test.converter;

import com.canoo.test.converter.factory.ConverterFactory;
import com.canoo.test.dto.BookDTO;
import com.canoo.test.dto.UserDTO;
import com.canoo.test.model.Book;
import com.canoo.test.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class ConverterFacade {

    @Autowired
    private ConverterFactory converterFactory;

    public User convert(final UserDTO dto) {
        return (User) converterFactory.getConverter(dto.getClass()).convert(dto);
    }
    public Book convert(final BookDTO dto) {
        return (Book) converterFactory.getConverter(dto.getClass()).convert(dto);
    }
}

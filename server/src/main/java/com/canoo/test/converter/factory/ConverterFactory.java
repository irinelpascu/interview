package com.canoo.test.converter.factory;

import com.canoo.test.converter.dto.BookDTOConverter;
import com.canoo.test.dto.BookDTO;
import com.canoo.test.dto.UserDTO;
import com.canoo.test.converter.dto.UserDTOConverter;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;


@Component
public class ConverterFactory {

    private Map<Object, Converter> converters;

    public ConverterFactory() {

    }

    @PostConstruct
    public void init() {
        converters = new HashMap<>();
        converters.put(UserDTO.class, new UserDTOConverter());
        converters.put(BookDTO.class, new BookDTOConverter());
    }

    public Converter getConverter(final Object type) {
        return converters.get(type);
    }
}

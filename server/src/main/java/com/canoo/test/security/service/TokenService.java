package com.canoo.test.security.service;


public interface TokenService {

    String getToken(String username, String password);
}

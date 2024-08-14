package com.springboot.main.controller;

import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MainController extends SimpleUrlAuthenticationSuccessHandler {

    @GetMapping("/")
    private void redirect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String uri = createURI().toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI() {
        MultiValueMap<String, String > quertParams = new LinkedMultiValueMap<>();
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("127.0.0.1")
                .port(3000)
                .queryParams(quertParams)
                .build()
                .toUri();
    }
}

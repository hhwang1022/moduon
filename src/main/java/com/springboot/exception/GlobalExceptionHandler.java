package com.springboot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<ExceptionCode> handleBusinessLogicException(BusinessLogicException ex) {
        ExceptionCode exceptionCode = ex.getExceptionCode();
        return new ResponseEntity<>(exceptionCode, HttpStatus.BAD_REQUEST);
    }
}

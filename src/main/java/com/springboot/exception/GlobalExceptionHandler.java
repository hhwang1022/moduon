package com.springboot.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<ErrorResponse> handleBusinessLogicException(BusinessLogicException ex) {
        ExceptionCode exceptionCode = ex.getExceptionCode();

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                exceptionCode.getMessage(),
                exceptionCode.name()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @Getter
    public class ErrorResponse {
        private int status;
        private String message;
        private String code;

        public ErrorResponse(int status, String message, String code) {
            this.status = status;
            this.message = message;
            this.code = code;
        }
    }
}

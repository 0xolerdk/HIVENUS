package com.hivenus.back_end.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        // Log the exception details
        System.err.println("Exception occurred: " + ex.getMessage());
        // Handle the response here, e.g., return a generic error response
        return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        // Log the exception details
        System.err.println("Access denied: " + ex.getMessage());
        // Handle the response here, e.g., return a 403 Forbidden response
        return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
    }
}

package org.kolis1on.backhome.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(ImageIsTooBigException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String imageIsTooBigException(ImageIsTooBigException ex) {
        return ex.getMessage();
    }

    @ExceptionHandler(PostIdNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String postIdNotFoundException(PostIdNotFoundException ex) {
        return ex.getMessage();
    }
}
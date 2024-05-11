package org.kolis1on.backhome.exception;


public class PostIdNotFoundException extends RuntimeException {
    public PostIdNotFoundException(String message) {
        super(message);
    }
}
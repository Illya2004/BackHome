package org.kolis1on.backhome.exception;

public class UserIdIsNotCorrectException extends RuntimeException {
    public UserIdIsNotCorrectException(String message) {
        super(message);
    }
}
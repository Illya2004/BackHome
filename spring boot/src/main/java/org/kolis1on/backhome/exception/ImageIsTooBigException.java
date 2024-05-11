package org.kolis1on.backhome.exception;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

public class ImageIsTooBigException extends RuntimeException {
    public ImageIsTooBigException(String message) {
        super(message);
    }
}
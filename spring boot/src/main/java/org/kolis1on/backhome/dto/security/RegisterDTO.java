package org.kolis1on.backhome.dto.security;

import lombok.Data;

@Data
public class RegisterDTO {
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String role;
}

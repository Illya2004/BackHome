package org.kolis1on.backhome.dto.security;

import org.kolis1on.backhome.entity.User;
import org.kolis1on.backhome.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {
    private String username;
    private String phoneNumber;
    private String email;
    private Role role;

    public static UserResponseDTO userToDTO(User user){

        return UserResponseDTO.builder()
                .username(user.getRealName())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

    }

}

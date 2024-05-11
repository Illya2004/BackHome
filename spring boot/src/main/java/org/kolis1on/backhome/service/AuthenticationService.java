package org.kolis1on.backhome.service;


import lombok.RequiredArgsConstructor;
import org.kolis1on.backhome.config.JwtService;
import org.kolis1on.backhome.dto.security.JwtAuthenticationResponseDTO;
import org.kolis1on.backhome.dto.security.LoginDTO;
import org.kolis1on.backhome.dto.security.RegisterDTO;
import org.kolis1on.backhome.dto.security.UserResponseDTO;
import org.kolis1on.backhome.entity.User;
import org.kolis1on.backhome.enums.Role;
import org.kolis1on.backhome.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public String decodePassword(String password){
        return passwordEncoder.encode(password);
    }

    public boolean ifUserExistsByEmail(String email){
      return userRepository.existsByEmail(email);
    }
    public JwtAuthenticationResponseDTO register(RegisterDTO registerDTO){



        var user = User.builder()
                .name(registerDTO.getName())
                .email(registerDTO.getEmail())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .phoneNumber(registerDTO.getPhoneNumber())
                .role(Role.valueOf(registerDTO.getRole()))
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return JwtAuthenticationResponseDTO.builder()
                .user(UserResponseDTO.userToDTO(user))
                .token(jwtToken)
                .build();
    }
    public JwtAuthenticationResponseDTO login(LoginDTO loginDTO){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(),
                loginDTO.getPassword()
        ));

        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return JwtAuthenticationResponseDTO.builder()
                .user(UserResponseDTO.userToDTO(user))
                .token(jwtToken)
                .build();
    }

}

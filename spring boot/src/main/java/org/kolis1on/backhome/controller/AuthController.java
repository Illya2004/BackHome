package org.kolis1on.backhome.controller;


import lombok.AllArgsConstructor;
import org.kolis1on.backhome.dto.security.JwtAuthenticationResponseDTO;
import org.kolis1on.backhome.dto.security.LoginDTO;
import org.kolis1on.backhome.dto.security.RegisterDTO;
import org.kolis1on.backhome.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/auth/")
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO){
            if(authenticationService.ifUserExistsByEmail(registerDTO.getEmail())){
                return new ResponseEntity<>("User by this email is already exists!", HttpStatus.CONFLICT);
            }
            return ResponseEntity.ok(authenticationService.register(registerDTO));
    }

    @PostMapping("login")
    public ResponseEntity<JwtAuthenticationResponseDTO> login(@RequestBody LoginDTO loginDto){
        return ResponseEntity.ok(authenticationService.login(loginDto));
    }



}

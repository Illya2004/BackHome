package org.kolis1on.backhome.dto;

import jakarta.persistence.PrePersist;
import lombok.Builder;
import lombok.Data;
import org.kolis1on.backhome.dto.security.UserResponseDTO;
import org.kolis1on.backhome.repository.UserRepository;
import org.springframework.cglib.core.Local;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Data
@Builder
public class PostResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String locationName;
    private String creationDate;
    private String lostDate;
    private String image;
    private UserResponseDTO user;

}

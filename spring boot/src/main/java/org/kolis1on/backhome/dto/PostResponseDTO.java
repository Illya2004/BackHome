package org.kolis1on.backhome.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Long creationDate;
    private Long lostDate;
    private Long userId;
}

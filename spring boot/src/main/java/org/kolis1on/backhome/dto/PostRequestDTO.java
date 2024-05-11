package org.kolis1on.backhome.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostRequestDTO {

    private String title;
    private String description;
    private String lostDate;
    private String locationName;
    private String locationCoords;
}

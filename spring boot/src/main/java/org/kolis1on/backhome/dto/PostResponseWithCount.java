package org.kolis1on.backhome.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class PostResponseWithCount {
    private Long count;
    private List<PostResponseDTO> posts;
}

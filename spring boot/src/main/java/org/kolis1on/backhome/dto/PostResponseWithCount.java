package org.kolis1on.backhome.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;


public record PostResponseWithCount (

     Long count,
     List<PostResponseDTO> posts
){
}

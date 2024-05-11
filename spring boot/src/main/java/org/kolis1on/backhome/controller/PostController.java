package org.kolis1on.backhome.controller;

import lombok.AllArgsConstructor;
import org.kolis1on.backhome.dto.PostRequestDTO;
import org.kolis1on.backhome.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping("/posts/")
public class PostController {
    private PostService postService;

    @PreAuthorize("hasRole('CREATOR')")
    @PostMapping("create")
    public HttpStatus create(@RequestBody PostRequestDTO postRequestDTO){
        postService.create(postRequestDTO);
        return HttpStatus.CREATED;
    }

}

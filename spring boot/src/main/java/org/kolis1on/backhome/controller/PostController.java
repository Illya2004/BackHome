package org.kolis1on.backhome.controller;

import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.kolis1on.backhome.dto.PostRequestDTO;
import org.kolis1on.backhome.dto.PostResponseDTO;
import org.kolis1on.backhome.dto.PostResponseWithCount;
import org.kolis1on.backhome.service.PostService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts/")
public class PostController {
    private final PostService postService;
    private final MinioClient minioClient;

    @Value("${minio.bucketName}")
    private String bucketName;

    @PreAuthorize("hasRole('CREATOR')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createPost(@RequestPart("post") PostRequestDTO postRequestDTO,
                           @RequestPart("image") MultipartFile image) {

        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(image.getOriginalFilename())
                            .stream(image.getInputStream(), image.getSize(), -1)
                            .build()
            );
            postService.create(postRequestDTO);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping
    public ResponseEntity<PostResponseWithCount> getByFilters(
            @RequestParam(value = "limit", required = true) Long limit,
                                                                    @RequestParam(value = "page", required = true) Long page,
                                                                    @RequestParam(value = "date", required = false) String date,
                                                                    @RequestParam(value = "location", required = false) String location) {

        List<PostResponseDTO> posts = postService.getByFilters(limit, page, date, location);
        return ResponseEntity.ok(
                new PostResponseWithCount(postService.countAllPosts(), posts));
    }

    @GetMapping("{postId}")
    @ResponseStatus(HttpStatus.OK)
    public PostResponseDTO getById(@PathVariable(value = "postId") Long id){
        return postService.getPostById(id);
    }

    @PostMapping(value = "test", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public HttpStatus test(@RequestPart("image") MultipartFile image){
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(image.getOriginalFilename())
                            .stream(image.getInputStream(), image.getSize(), -1)
                            .build()
            );


        } catch (Exception e) {
            e.printStackTrace();
        }

        return HttpStatus.OK;
    }

}

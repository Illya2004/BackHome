package org.kolis1on.backhome.service;

import lombok.AllArgsConstructor;
import org.kolis1on.backhome.config.JwtService;
import org.kolis1on.backhome.dto.PostRequestDTO;
import org.kolis1on.backhome.entity.Post;
import org.kolis1on.backhome.repository.PostRepository;
import org.kolis1on.backhome.repository.UserRepository;
import org.kolis1on.backhome.utils.DateFormat;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PostService {
    private PostRepository postRepository;
    private JwtService jwtService;
    private UserRepository userRepository;

    public void create(PostRequestDTO postRequestDTO) {
        String token = jwtService.getCurrentUserToken();
        String userEmail = jwtService.extractUserEmail(token);

        Post post = Post.builder()
                .title(postRequestDTO.getTitle())
                .description(postRequestDTO.getDescription())
                .creationDate(DateFormat.dateToTimestamp(postRequestDTO.getLostDate()))
                .user(userRepository.findByEmail(userEmail).orElseThrow())
                .build();


        postRepository.save(post);
    }
    public Long countAllPosts(){
        return postRepository.count();
    }
    public void getAllByFilters() {

    }
}

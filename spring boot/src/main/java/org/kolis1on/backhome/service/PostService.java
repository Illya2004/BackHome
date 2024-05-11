package org.kolis1on.backhome.service;

import lombok.AllArgsConstructor;
import org.kolis1on.backhome.config.JwtService;
import org.kolis1on.backhome.dto.PostRequestDTO;
import org.kolis1on.backhome.dto.PostResponseDTO;
import org.kolis1on.backhome.dto.security.UserResponseDTO;
import org.kolis1on.backhome.entity.Post;
import org.kolis1on.backhome.exception.ImageIsTooBigException;
import org.kolis1on.backhome.exception.PostIdNotFoundException;
import org.kolis1on.backhome.repository.PostRepository;
import org.kolis1on.backhome.repository.UserRepository;
import org.kolis1on.backhome.utils.DateFormat;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

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
                .lostDate(DateFormat.dateToTimestamp(postRequestDTO.getLostDate()))
                .locationName(postRequestDTO.getLocationName())
                .locationCoords(postRequestDTO.getLocationCoords())
                //.image(postRequestDTO.getImage())
                .user(userRepository.findByEmail(userEmail).orElseThrow())
                .build();


        postRepository.save(post);
    }

    public Long countAllPosts() {
        return postRepository.count();
    }

    public PostResponseDTO getPostById(Long id){
        Post post = postRepository.findById(id).orElseThrow(() -> new PostIdNotFoundException("Post id was not found, please try again"));
        return PostResponseDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .locationName(post.getLocationName())
                .creationDate(timestampToDateString(post.getCreationDate()))
                .lostDate(timestampToDateString(post.getLostDate()))
                .image(post.getImage())
                .user(UserResponseDTO.userToDTO(post.getUser()))
                .build();

    }
    @Transactional

    public List<PostResponseDTO> getByFilters(long limit,
                                              long page,
                                              String filterDate,
                                              String locationName) {
        List<Post> posts = postRepository.findAll();

        if (locationName != null && !locationName.isEmpty()) {
            posts = posts.stream()
                    .filter(post -> post.getLocationName().equals(locationName))
                    .toList();
        }
        if(filterDate != null) {
            if (filterDate.equals("ASC"))
                posts = posts.stream().
                        sorted(Comparator.comparing(Post::getCreationDate)).toList();

            if (filterDate.equals("DESC"))
                posts = posts.stream().
                        sorted(Comparator.comparing(Post::getCreationDate).reversed()).toList();
        }
        posts = posts.stream()
                .skip((page - 1) * limit)
                .limit(limit)
                .toList();

        return transformRequestList(posts);
    }

    private boolean imageSizeIsTooBig(String base64Image) {
        long maxImageSizeBytes = 15 * 1024 * 1024;

        String[] base64Split = base64Image.split(",");
        base64Image = base64Split[base64Split.length - 1];
        byte[] imageBytes = Base64.getMimeDecoder().decode(base64Image);
        long imageSizeBytes = imageBytes.length;

        return imageSizeBytes <= maxImageSizeBytes;
    }


    private List<PostResponseDTO> transformRequestList(List<Post> posts) {

        return posts.stream().map(post -> PostResponseDTO.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .user(UserResponseDTO.userToDTO(post.getUser()))
                        .description(post.getDescription())
                        .creationDate(timestampToDateString(post.getCreationDate()))
                        .locationName(post.getLocationName())
                        .lostDate(timestampToDateString(post.getLostDate()))
                        .image(post.getImage())

                        .build())
                .toList();

    }

    public String getImageByPostId(Long id) {
        return postRepository.findById(id).get().getImage();
    }


    private String timestampToDateString(Long timestamp){
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

        Date date = new Date(timestamp);

        return dateFormat.format(date);
    }


}

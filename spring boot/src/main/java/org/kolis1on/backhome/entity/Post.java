package org.kolis1on.backhome.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kolis1on.backhome.dto.PostRequestDTO;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(generator = "post_sequence")
    @SequenceGenerator(name="post_sequence", sequenceName="post_sequence", allocationSize=1)
    private Long id;

    private String title;
    private String description;
    private Long creationDate;
    private Long lostDate;

    @ManyToOne
    private User user;




    @PrePersist
    protected void onCreate() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        this.creationDate = timestamp.getTime();

    }


}

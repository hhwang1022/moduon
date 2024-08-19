package com.springboot.board.post.entity;

import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getPosts().contains(this)) {
            member.setPosts(this);
        }
    }

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private String isNotice;

    @Column(nullable = false)
    private int view = 0;

    @Column(nullable = false)
    private int likeCount = 0;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private String image5;

    public enum Category {
        CATEGORY_8090("8090세대"),
        CATEGORY_9000("90000세대"),
        CATEGORY_0010("0010세대"),
        CATEGORY_1020("1020세대");

        @Getter
        private String category;

        Category(String category) {
            this.category = category;
        }
    }

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PostLike> postLikes = new ArrayList<>();

    public void setPostLikes(PostLike postLike) {
        postLikes.add(postLike);
        if(postLike.getPost() != this) {
            postLike.setPost(this);
        }
    }

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PostReply> postReplies = new ArrayList<>();

    public void setPostReplies(PostReply postReply){
        postReplies.add(postReply);
        if(postReply.getPost() != this){
            postReply.setPost(this);
        }
    }
}

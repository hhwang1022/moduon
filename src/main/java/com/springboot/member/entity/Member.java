package com.springboot.member.entity;

import com.springboot.audit.Auditable;
import com.springboot.board.balancegame.entity.BalanceGameReply;
import com.springboot.board.photo.entity.Photo;
import com.springboot.board.photo.entity.PhotoLike;
import com.springboot.board.photo.entity.PhotoReply;
import com.springboot.board.post.entity.Post;
import com.springboot.board.post.entity.PostLike;
import com.springboot.board.post.entity.PostReply;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 100, nullable = false, unique = true)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Generation memberGeneration;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public enum MemberStatus {
        MEMBER_ACTIVE("활동 회원"),
        MEMBER_SLEEP("휴면 회원"),
        MEMBER_QUIT("탈퇴 회원");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    public enum Generation {
        GENERATION_8090("8090세대"),
        GENERATION_9000("9000세대"),
        GENERATION_0010("0010세대"),
        GENERATION_1020("1020세대");

        @Getter
        private String generation;

        Generation(String generation) {
            this.generation = generation;
        }
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
    private List<Post> posts = new ArrayList<>();

    public void setPosts(Post post) {
        posts.add(post);
        if (post.getMember() != this) {
            post.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
    private List<PostLike> postLikes = new ArrayList<>();

    public void setPostLikes(PostLike postLike) {
        postLikes.add(postLike);
        if (postLike.getMember() != this) {
            postLike.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
    private List<PostReply> postReplies = new ArrayList<>();

    public void setPostReplies(PostReply postReply) {
        postReplies.add(postReply);
        if (postReply.getMember() != this) {
            postReply.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
    private List<BalanceGameReply> balanceGameReplies = new ArrayList<>();

    public void setBalanceGameReplies(BalanceGameReply balanceGameReply) {
        balanceGameReplies.add(balanceGameReply);
        if (balanceGameReply.getMember() != this) {
            balanceGameReply.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
    private List<Photo> photos = new ArrayList<>();

    public void setPhotos(Photo photo) {
        photos.add(photo);
        if (photo.getMember() != this) {
            photo.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member")
    private List<PhotoLike> photoLikes = new ArrayList<>();

    public void setPhotoLikes(PhotoLike photoLike) {
        photoLikes.add(photoLike);
        if (photoLike.getMember() != this) {
            photoLike.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member")
    private List<PhotoReply> photoReplies = new ArrayList<>();

    public void setPostReplies(PhotoReply photoReply) {
        photoReplies.add(photoReply);
        if (photoReply.getMember() != this) {
            photoReply.setMember(this);
        }
    }
}

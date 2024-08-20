package com.springboot.board.photo.entity;

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
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoId;

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

    @Column(nullable = false)
    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private String image5;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Category category;

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

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getPhotos().contains(this)) {
            member.setPhotos(this);
        }
    }

    @OneToMany(mappedBy = "photo", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PhotoLike> photoLikes = new ArrayList<>();

    public void setPhotoLikes(PhotoLike photoLike) {
        photoLikes.add(photoLike);
        if (photoLike.getPhoto() != this) {
            photoLike.setPhoto(this);
        }
    }

    @OneToMany(mappedBy = "photo", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PhotoReply> photoReplyList = new ArrayList<>();

    public void setPhotoReplies(PhotoReply photoReply) {
        photoReplyList.add(photoReply);
        if (photoReply.getPhoto() != this) {
            photoReply.setPhoto(this);

        }
    }
}

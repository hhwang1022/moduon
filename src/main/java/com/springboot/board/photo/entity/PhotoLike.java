package com.springboot.board.photo.entity;

import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class PhotoLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getPhotoLikes().contains(this)) {
            member.setPhotoLikes(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "PHOTO_ID")
    private Photo photo;

    public void setPhoto(Photo photo) {
        this.photo = photo;
        if (!photo.getPhotoLikes().contains(this)) {
            photo.setPhotoLikes(this);
        }
    }
}

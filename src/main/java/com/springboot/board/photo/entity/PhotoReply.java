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
public class PhotoReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoReplyId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!member.getPhotoReplies().contains(this)) {
            member.setPostReplies(this);
        }
    }
    @ManyToOne
    @JoinColumn(name = "PHOTO_ID")
    private Photo photo;

    public void setPhoto(Photo photo) {
        this.photo = photo;
        if (!photo.getPhotoReplyList().contains(this)) {
            photo.setPhotoReplies(this);
        }
    }

    @Column(nullable = false)
    private String body;


}

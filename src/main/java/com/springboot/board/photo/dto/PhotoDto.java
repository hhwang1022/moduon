package com.springboot.board.photo.dto;

import com.springboot.board.photo.entity.Photo.Category;
import com.springboot.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class PhotoDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String title;

        @NotBlank
        private String body;

        private String isNotice;

        @NotBlank
        private String image1;

        private String image2;

        private String image3;

        private String image4;

        private String image5;

        private Category category;

        private long memberId;

        public Member getMember() {
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long photoId;

        @NotBlank
        private String title;

        @NotBlank
        private String body;

        private String isNotice;

        @NotBlank
        private String image1;

        private String image2;

        private String image3;

        private String image4;

        private String image5;

        private Category category;

        public void setPhotoId(long photoId) {
            this.photoId = photoId;
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long photoId;
        private long memberId;
        private String title;
        private String body;
        private String inNotice;
        private int view;
        private int likeCount;
        private LocalDateTime createAt;
        private String category;
        private String image1;
        private String image2;
        private String image3;
        private String image4;
        private String image5;

    }
}

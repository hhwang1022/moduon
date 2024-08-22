package com.springboot.board.post.dto;

import com.springboot.board.post.entity.Post.Category;
import com.springboot.board.post.entity.PostReply;
import com.springboot.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto  {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String title;
        @NotBlank
        private String body;

        private String isNotice;

        private Category category;

        private String image1;
        private String image2;
        private String image3;
        private String image4;
        private String image5;
        @Setter
        private String memberEmail;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        @Setter
        private long postId;

        @NotBlank
        private String title;

        @NotBlank
        private String body;

        private String isNotice;

        private Category category;

        private String image1;
        private String image2;
        private String image3;
        private String image4;
        private String image5;
        @Setter
        private String memberEmail;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long postId;
        private long memberId;
        private String title;
        private String body;
        private String isNotice;
        private int view;
        private int likeCount;
        private LocalDateTime createdAt;
        private String category;
        private String image1;
        private String image2;
        private String image3;
        private String image4;
        private String image5;
        private List<PostReplyDto.Response> postReplyList;
        private String nickname;
    }
}

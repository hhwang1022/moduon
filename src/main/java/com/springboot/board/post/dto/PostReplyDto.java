package com.springboot.board.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class PostReplyDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @Setter
        private String memberEmail;

        @NotBlank
        private String body;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        @Setter
        private long postReplyId;

        @NotBlank
        private String body;

        @Setter
        private String memberEmail;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long postReplyId;
        private long postId;
        private long memberId;
        private String body;
        private String memberNickname;
    }
}

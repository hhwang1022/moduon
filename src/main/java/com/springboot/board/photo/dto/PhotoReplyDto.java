package com.springboot.board.photo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class PhotoReplyDto {

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
        private long photoReplyId;

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
        private long photoReplyId;
        private String memberNickname;
        private long photoId;
        private String body;
    }
}

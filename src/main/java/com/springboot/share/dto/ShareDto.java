package com.springboot.share.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class ShareDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @Setter
        private String memberEmail;
        @Setter
        private Long balanceGameId;
        private String shareType;
    }
}

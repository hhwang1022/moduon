package com.springboot.board.photo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PhotoLikeDto {

    @Getter
    @NoArgsConstructor
    public static class Post {
        private long memberId;
        private long photoId;
    }
}
